---
layout: default
title: Troubleshooting
---

# Troubleshooting & FAQ

Common issues and how to fix them.

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
