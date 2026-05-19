---
layout: default
title: Troubleshooting
---

# Troubleshooting & FAQ

Common issues and how to fix them. Windows-specific issues are grouped together at the top because they come up most often in workshops. The Account & Login, Jobs & Slurm, and File System sections below apply to every operating system.

---

## Windows-Specific Issues

### "ssh : The term 'ssh' is not recognized" in PowerShell

**Error:**
```
ssh : The term 'ssh' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

**Cause:** The OpenSSH Client feature is not turned on. SSH ships with Windows 10/11 but is not always enabled by default.

**Fix:** Open **Settings > Apps > Optional Features > Add a feature**, search for **OpenSSH Client**, check it, and click **Install**. Close PowerShell, reopen it, and try the `ssh` command again.

Or, run PowerShell **as Administrator** and execute:
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

If your IT department blocks installing OpenSSH, download [MobaXterm](https://mobaxterm.mobatek.net/) instead and use it for SSH.

### Password and MFA prompts show nothing when I type

This is normal. PowerShell, MobaXterm, and PuTTY all hide password input on purpose. There are no asterisks or dots. Type your password, press Enter, then type your MFA token, press Enter. Take your time and type carefully.

### "Batch script contains DOS line breaks (\\r\\n)" when running sbatch

**Error:**
```
sbatch: error: Batch script contains DOS line breaks (\r\n)
sbatch: error: instead of expected UNIX line breaks (\n).
```

**Cause:** You created your `.sh` job script on Windows (likely in Notepad), which saves files with Windows-style line endings. Linux and Slurm expect Unix-style line endings.

**Fix on TACC:**
```bash
dos2unix my_script.sh
```

If `dos2unix` is not available on your system:
```bash
sed -i 's/\r$//' my_script.sh
```

**Prevent it next time:** edit job scripts directly on TACC with `nano my_script.sh`, or in VS Code on Windows switch the line endings indicator at the bottom-right of the status bar from `CRLF` to `LF` before saving.

### scp from PowerShell can't find my Windows file

**Cause:** Path syntax mismatch. The Windows side of an `scp` command needs backslashes (`\`), and the TACC side needs forward slashes (`/`). It's easy to get them backwards.

**Fix:** Use this pattern:
```powershell
scp C:\Users\YourName\Documents\file.txt user@ls6.tacc.utexas.edu:/work2/0xxxx/user/
```

If the path contains spaces, wrap it in double quotes:
```powershell
scp "C:\Users\Your Name\My Project\file.txt" user@ls6.tacc.utexas.edu:/work2/0xxxx/user/
```

### "Host key verification failed" after TACC maintenance

**Cause:** The server's host key changed (this happens occasionally after major maintenance), and your machine still has the old key cached.

**Fix:**
```powershell
ssh-keygen -R ls6.tacc.utexas.edu
```

Replace `ls6` with the hostname you were trying to reach. Then try `ssh` again. You'll be re-prompted to accept the new host key.

---

## Account & Login

### "Permission denied" when trying to SSH

- **Did you set up MFA?** You must set up multi-factor authentication before your first SSH login. See [Step 2 of the Getting Started guide](./).
- **Are you using the right hostname?** Double-check the [System Hostnames table](./#system-hostnames).
- **Is your account active?** It can take a few minutes after creating your TACC account before SSH access works. Try again in 10–15 minutes.

### MFA token keeps getting rejected

- Make sure the **time on your phone is correct**. Authenticator apps generate time-based codes — if your phone's clock is off by even a minute, tokens will fail.
- If you set up SMS/text instead of an authenticator app, you'll need to switch. TACC does not reliably support SMS for MFA. Use Okta Verify or Duo Mobile.

### I created my account on the TACC portal instead of using the invitation link

Your account exists, but it's not connected to the MSCF allocation. Contact the allocation manager (Ashley Scruse) to manually add your account to the project.

---

## Jobs & Slurm

### My job is stuck in the queue (status: PD)

This is normal. Common reasons:
- **Resources are busy** — other jobs are using the nodes you requested. Wait it out.
- **You requested too much** — try fewer nodes, less time, or a different queue.
- Run `squeue -u $USER` to check status. The `REASON` column will tell you why it's pending (e.g., `Priority`, `Resources`).

### My job failed immediately

Check the error file:
```bash
cat my_job.<job_id>.err
```

Common causes:
- **Wrong allocation name** — make sure `#SBATCH -A` matches the allocation name the manager gave you.
- **Module not available** — run `module spider <software>` to check if the module exists on your system.
- **Ran on the login node by accident** — if you ran your script with `bash script.sh` instead of `sbatch script.sh`, it ran on the login node and may have been killed.

### "sbatch: error: Batch job submission failed: Invalid account"

Your `#SBATCH -A` allocation name is wrong. Contact the allocation manager for the correct account name.

---

## File System

### "Disk quota exceeded"

You've hit the storage limit on `$HOME` (~10 GB). Move large files to `$WORK`:
```bash
mv ~/big_dataset $WORK/
```

Check your usage:
```bash
du -sh $HOME
du -sh $WORK
```

### My files in $SCRATCH disappeared

`$SCRATCH` is **not permanent storage**. Files unused for 10 days are automatically purged. Keep anything you need in `$WORK`.

---

## File Transfer

### SCP is slow for large transfers

Use `rsync` instead — it only transfers files that have changed:
```bash
rsync -avz my_project/ your_username@ls6.tacc.utexas.edu:$WORK/my_project/
```

### "Connection timed out" during file transfer

- Make sure you're on a stable network (not public Wi-Fi that blocks SSH).
- For very large transfers, consider using [Globus](https://www.globus.org/) — TACC supports it and it handles interruptions automatically.

---

## Still stuck?

- **TACC Support Ticket**: [https://portal.tacc.utexas.edu/tacc-consulting](https://portal.tacc.utexas.edu/tacc-consulting)
- **TACC Documentation**: [https://docs.tacc.utexas.edu/](https://docs.tacc.utexas.edu/)
- **Allocation Questions**: Contact Ashley Scruse (allocation manager)
