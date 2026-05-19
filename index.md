---
layout: default
title: Getting Started
---
# Getting Started with the Morehouse Supercomputing Facility (MSCF)

Welcome to MSCF! While we build out our own supercomputing infrastructure, we are using resources at the **Texas Advanced Computing Center (TACC)** to provide HPC access to our researchers. MSCF is not hosted at TACC. TACC is a partner providing compute time while our facility is under development.

This guide walks you through everything you need to get set up on TACC and run your first job.

## Choose Your Operating System

The TACC-side steps (account, MFA, modules, Slurm) work the same on every system. Where instructions differ, this page shows the version for your operating system. Pick yours below and the page will remember your choice.

<div class="os-tabs" role="tablist" aria-label="Choose your operating system">
  <button class="os-tab" data-os="mac" type="button" role="tab" aria-selected="true">macOS</button>
  <button class="os-tab" data-os="linux" type="button" role="tab" aria-selected="false">Linux</button>
  <button class="os-tab" data-os="windows" type="button" role="tab" aria-selected="false">Windows</button>
  <p class="os-tab-hint">OS-specific sections below will update when you switch tabs.</p>
</div>

<script>
(function() {
  var KEY = 'mscf-os';
  var validOS = ['mac', 'linux', 'windows'];

  function applyOS(os) {
    if (validOS.indexOf(os) === -1) os = 'mac';
    document.body.classList.remove('os-mac', 'os-linux', 'os-windows');
    document.body.classList.add('os-' + os);
    var tabs = document.querySelectorAll('.os-tab');
    for (var i = 0; i < tabs.length; i++) {
      var isActive = tabs[i].getAttribute('data-os') === os;
      tabs[i].classList.toggle('active', isActive);
      tabs[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
    }
    try { localStorage.setItem(KEY, os); } catch (e) {}
  }

  function detectOS() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored && validOS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var p = (navigator.platform || '').toLowerCase();
    var ua = (navigator.userAgent || '').toLowerCase();
    if (p.indexOf('mac') !== -1) return 'mac';
    if (p.indexOf('win') !== -1) return 'windows';
    if (p.indexOf('linux') !== -1 && ua.indexOf('android') === -1) return 'linux';
    return 'mac';
  }

  document.addEventListener('DOMContentLoaded', function() {
    applyOS(detectOS());
    var tabs = document.querySelectorAll('.os-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function(e) {
        applyOS(e.currentTarget.getAttribute('data-os'));
      });
    }
  });
})();
</script>

---

## Step 1: Create Your TACC Account

After you submit the access request form, the allocation manager will add you to the project. You'll receive an email from TACC with the subject line:

> **"TACC Project Invitation Action Required: Account Request"**

Here's what to do:

1. **Open the invitation email** and click the link to create your account
2. Fill out the registration form:
   - Use your **institutional email** (e.g., @morehouse.edu)
   - Choose a username you'll remember. This is what you'll use to log in
   - Set a strong password
3. Complete the account verification if prompted

> **Important:** You must use the link in the invitation email. Do not go to the TACC portal separately. The invitation link connects your new account to the project allocation automatically.

---

## Step 2: Set Up Multi-Factor Authentication (MFA)

TACC requires MFA for all logins. Set this up **before** trying to SSH in.

> **Do NOT use SMS/text messages for MFA.** Use an authenticator app instead.

There are two ways to get to the MFA setup page:

**Option A:** Go directly to **TACC Accounts** at [accounts.tacc.utexas.edu](https://accounts.tacc.utexas.edu/) and click **Multi-factor Auth** in the sidebar.

![TACC Accounts sidebar — Multi-factor Auth](images/mfa-ss.png)

**Option B:** Log in to the **TACC User Portal** at [portal.tacc.utexas.edu](https://portal.tacc.utexas.edu/), click **Manage Account** in the sidebar, then click **Manage Multi-factor Authentication**.

![TACC User Portal — Manage Account](images/user-portal-manage-account.png)

Once you're on the MFA page, set up an **authenticator app**. Here are our recommended options:

- **Okta Verify** (recommended): [iOS](https://apps.apple.com/app/okta-verify/id490179405) / [Android](https://play.google.com/store/apps/details?id=com.okta.android.auth)
- **Duo Mobile**: [iOS](https://apps.apple.com/app/duo-mobile/id422663827) / [Android](https://play.google.com/store/apps/details?id=com.duosecurity.duomobile)

4. Follow the on-screen instructions to pair your device
5. Test it by logging out and back in to the portal

---

## Step 3: Log In via SSH

Once your account is active and MFA is set up, connect to the system. The instructions for this step depend on your operating system. **Use the tabs at the top of the page to switch between macOS, Linux, and Windows.**

<div class="os-only os-mac" markdown="1">

### On macOS

**Open Terminal.** Press `Cmd + Space`, type `Terminal`, press Enter. Or open it from `Applications > Utilities > Terminal`. iTerm2 works too if you prefer it.

Run:

```bash
ssh your_username@ls6.tacc.utexas.edu
```

The part after `@` is the **hostname of the system you want to access**, followed by `.tacc.utexas.edu`. Replace it with the correct one from the [System Hostnames table](#system-hostnames) below.

When prompted:

1. Enter your **TACC password**
2. Enter your **MFA token** (from your authenticator app)

> **Note:** When you type your password and MFA token, nothing will appear on the screen. No characters, no asterisks, no dots. This is normal. Terminal is still receiving your input. Just type carefully and press Enter.

The first time you connect, macOS will ask you to accept the host fingerprint. Type `yes` and press Enter. You won't be asked again on this machine.

</div>

<div class="os-only os-linux" markdown="1">

### On Linux

Open your terminal application (GNOME Terminal, Konsole, xterm, or your distro's default). SSH is installed by default on essentially every Linux distribution.

Run:

```bash
ssh your_username@ls6.tacc.utexas.edu
```

Replace `ls6` with the hostname for your assigned system (see the [System Hostnames table](#system-hostnames) below).

When prompted:

1. Enter your **TACC password**
2. Enter your **MFA token** (from your authenticator app)

> **Note:** When you type your password and MFA token, nothing will appear on the screen. No characters, no asterisks, no dots. This is normal. The terminal is still receiving your input. Just type carefully and press Enter.

The first time you connect, you will be asked to accept the host fingerprint. Type `yes` and press Enter.

</div>

<div class="os-only os-windows" markdown="1">

### On Windows

Windows does not have a single built-in terminal the way macOS does. Pick one of the options below and stick with it for the rest of the workshop.

| Tool | Best for |
|---|---|
| **Windows Terminal + PowerShell** (Windows 10/11) | Most users. Uses the same `ssh` command as macOS and Linux. Recommended. |
| **MobaXterm** | New to the command line, or want a side-panel file browser. Free download from [mobaxterm.mobatek.net](https://mobaxterm.mobatek.net/). |
| **Windows Subsystem for Linux (WSL)** | Already comfortable with Linux. Install Ubuntu from the Microsoft Store. |
| **PuTTY** | Older Windows machines or locked-down work laptops. Free from [putty.org](https://www.putty.org/). |

The rest of this section assumes **Windows Terminal with PowerShell**. If you chose MobaXterm or PuTTY, see [Using MobaXterm or PuTTY](#using-mobaxterm-or-putty) at the bottom of Step 3.

#### 1. Open Windows Terminal

Press the **Windows key**, type `Windows Terminal` (Windows 11) or `PowerShell` (Windows 10), then click the app. You should see a prompt like:

```
PS C:\Users\YourName>
```

#### 2. Confirm SSH is installed

Type:

```powershell
ssh -V
```

If you see output like `OpenSSH_for_Windows_8.6p1`, you are ready. Skip to step 3.

If you see `ssh : The term 'ssh' is not recognized...`, OpenSSH is not turned on. Fix it with one of these:

**Option A: Enable OpenSSH Client.** Open **Settings > Apps > Optional Features > Add a feature**, search for **OpenSSH Client**, check it, and click **Install**. Close PowerShell, reopen it, and try `ssh -V` again.

**Option B:** Open PowerShell **as Administrator** and run:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

**Option C:** If you cannot enable OpenSSH (locked-down work laptop, IT restrictions), download **MobaXterm** instead and use it for SSH. See [Using MobaXterm or PuTTY](#using-mobaxterm-or-putty).

#### 3. Connect to TACC

Run:

```powershell
ssh your_username@ls6.tacc.utexas.edu
```

Replace `ls6` with the hostname for your assigned system (see the [System Hostnames table](#system-hostnames) below).

When prompted:

1. Enter your **TACC password**
2. Enter your **MFA token** (from your authenticator app)

> **Important:** When you type your password and MFA token, nothing will appear on the screen. No characters, no asterisks, no dots. PowerShell hides input on purpose. Just type carefully and press Enter. This trips up almost every new Windows user.

The first time you connect, PowerShell will ask:

```
The authenticity of host 'ls6.tacc.utexas.edu' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type `yes` and press Enter. You won't be asked again on this machine.

#### Using MobaXterm or PuTTY

If you chose **MobaXterm**:

1. Click **Session > SSH**
2. **Remote host:** `ls6.tacc.utexas.edu` (or your assigned system's hostname)
3. Check **Specify username** and enter your TACC username
4. Click **OK**
5. When prompted, enter your TACC password and MFA token. The same silent-input rule applies.

If you chose **PuTTY**:

1. **Host Name:** `ls6.tacc.utexas.edu`
2. **Port:** 22, **Connection type:** SSH
3. Click **Open**
4. Enter your TACC username, password, and MFA token at the prompts

</div>

### System Hostnames

| System    | Hostname    | Details |
| --------- | ----------- | ------- |
| Lonestar6 | `ls6`       | [System specs](https://docs.tacc.utexas.edu/hpc/lonestar6/) |
| Frontera  | `frontera`  | [System specs](https://docs.tacc.utexas.edu/hpc/frontera/) |
| Stampede3 | `stampede3` | [System specs](https://docs.tacc.utexas.edu/hpc/stampede3/) |
| Vista     | `vista`     | [System specs](https://docs.tacc.utexas.edu/hpc/vista/) |

> Not sure which system to use? Check the system specs linked above to see which one fits your workload.

---

## Step 4: Understand the File System

TACC systems have three main storage areas. Know which to use:

| Location           | Path                        | Purpose                    | Quota    | Backed Up?                 | Purged?                         |
| ------------------ | --------------------------- | -------------------------- | -------- | -------------------------- | ------------------------------- |
| **$HOME**    | `/home1/0xxxx/username`   | Config files, scripts      | ~10 GB   | Yes. Backed up regularly | No                              |
| **$WORK**    | `/work2/0xxxx/username`   | Code, libraries, datasets  | ~1 TB    | No. Not backed up        | No                              |
| **$SCRATCH** | `/scratch/0xxxx/username` | Active job I/O, temp files | No limit | No. Not backed up        | Yes. Files unused for 10 days |

> **Important:** `$SCRATCH` is **not permanent storage**. Files that have not been accessed in 10 days are automatically purged. Do not store anything there that you can't afford to lose. `$WORK` is also not backed up, so keep your own copies of critical data.

**Rule of thumb:**

- Put your code and input data in `$WORK`
- Run jobs that write output to `$SCRATCH`
- Keep only essential config in `$HOME`

---

## Step 5: Load Software Modules

TACC uses the **Lmod module system** to manage software. Nothing is loaded by default.

```bash
# See what's available
module avail

# Search for specific software
module spider python

# Load a module
module load python3/3.11

# See what you have loaded
module list

# Unload a module
module unload python3

# Reset to defaults
module reset
```

Common modules you might need:

```bash
module load python3       # Python
module load gcc           # GNU compilers
module load cuda          # GPU computing (if applicable)
module load intel         # Intel compilers
module load mvapich2      # MPI for parallel computing
```

---

## Step 6: Submit Your First Job

TACC uses the **Slurm** workload manager. You do NOT run compute-heavy work on the login node. You submit it as a job.

### Create a Job Script

Create a file called `my_first_job.sh`:

```bash
#!/bin/bash
#SBATCH -J my_test_job          # Job name
#SBATCH -o my_test_job.%j.out   # Output file (%j = job ID)
#SBATCH -e my_test_job.%j.err   # Error file
#SBATCH -p normal               # Queue/partition (normal, development, gpu, etc.)
#SBATCH -N 1                    # Number of nodes
#SBATCH -n 1                    # Number of tasks
#SBATCH -t 00:10:00             # Wall clock time (HH:MM:SS)
#SBATCH -A YOUR_ALLOCATION       # Allocation/account name. Provided by the allocation manager

echo "Job started at $(date)"
echo "Running on node: $(hostname)"
echo "Hello from TACC!"

# Replace the lines below with your actual work
module load python3
python3 -c "print('Python is working on TACC!')"

echo "Job finished at $(date)"
```

<div class="os-only os-windows" markdown="1">

> **Windows users, read this before saving the file.** Windows and Linux use different invisible end-of-line characters. Windows uses CRLF; Linux (and TACC) uses LF. A `.sh` script saved on Windows in Notepad will fail on TACC with:
>
> ```
> sbatch: error: Batch script contains DOS line breaks (\r\n)
> sbatch: error: instead of expected UNIX line breaks (\n).
> ```
>
> **Three safe ways to avoid this:**
>
> 1. **Edit the script directly on TACC** using `nano my_first_job.sh`. Press `Ctrl+O` to save, `Ctrl+X` to exit. Files saved on TACC always have correct line endings.
> 2. **Use VS Code on Windows.** Look at the bottom-right status bar. If it says `CRLF`, click it and switch to `LF`. Save.
> 3. **Do not use Notepad.** If you already saved a script in Notepad, fix it on TACC with `dos2unix my_first_job.sh` (or `sed -i 's/\r$//' my_first_job.sh` if `dos2unix` is unavailable).

</div>

### Submit the Job

```bash
sbatch my_first_job.sh
```

### Monitor Your Job

```bash
# Check job status
squeue -u $USER

# Get detailed job info
scontrol show job <job_id>

# Cancel a job
scancel <job_id>
```

### Check Output

Once the job completes, check the output and error files:

```bash
cat my_test_job.<job_id>.out
cat my_test_job.<job_id>.err
```

---

## Step 7: Transfer Files

### Downloading files from the web onto TACC

If your files are hosted online (Google Drive, GitHub, Dropbox, a web server, etc.), you can download them directly to TACC using `wget`. This is the same on every operating system because it runs **on TACC**, not on your laptop.

```bash
cd $WORK
wget https://example.com/link-to-your-file.zip
```

To download from **Google Drive**, use the shareable link with `wget`:

```bash
wget -O my_file.zip "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
```

> **Tip:** The `YOUR_FILE_ID` is the long string of characters in your Google Drive sharing link between `/d/` and `/view`.

You can use `wget` to pull publicly available datasets directly onto TACC. No need to download to your laptop first and then re-upload:

```bash
# Download a file from any public URL
cd $WORK
wget https://data.example.org/dataset.csv

# Download and rename the file
wget -O my_data.csv https://data.example.org/some-long-filename.csv
```

### Uploading files from your laptop to TACC

If the file only exists on your laptop, the upload command depends on your operating system.

<div class="os-only os-mac" markdown="1">

In a new Terminal window (not the one connected to TACC), run:

```bash
# Single file
scp ~/Documents/my_file.txt your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/

# Entire folder
scp -r ~/Documents/my_project your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/
```

You will be prompted for your TACC password and MFA token, same as SSH.

For repeated transfers of a large project, use `rsync` (only transfers what's changed):

```bash
rsync -avz ~/Documents/my_project/ your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/my_project/
```

</div>

<div class="os-only os-linux" markdown="1">

In a new terminal window (not the one connected to TACC), run:

```bash
# Single file
scp ~/my_file.txt your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/

# Entire folder
scp -r ~/my_project your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/
```

You will be prompted for your TACC password and MFA token, same as SSH.

For repeated transfers of a large project, use `rsync`:

```bash
rsync -avz ~/my_project/ your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/my_project/
```

</div>

<div class="os-only os-windows" markdown="1">

**Option A: `scp` from PowerShell.** PowerShell ships with `scp` alongside `ssh`. From your Windows machine (not from inside TACC):

```powershell
# Single file
scp C:\Users\YourName\Documents\my_file.txt your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/

# Entire folder
scp -r C:\Users\YourName\Documents\my_project your_username@ls6.tacc.utexas.edu:/work2/0xxxx/your_username/
```

You will be prompted for your TACC password and MFA token, same as SSH.

> **Tip:** Windows paths use backslashes (`\`), TACC paths use forward slashes (`/`). Do not mix them. The Windows side of the command uses `\`; the TACC side uses `/`.

**Option B: MobaXterm file browser.** If you are using MobaXterm, open an SSH session to TACC. The left sidebar shows a file browser of your TACC home directory. Drag and drop files from Windows Explorer into the MobaXterm sidebar to upload.

**Option C: WinSCP.** If you are using PuTTY, install [WinSCP](https://winscp.net/) for a GUI file transfer tool.

</div>

---

## Common Slurm Queues

| Queue           | Max Nodes | Max Time | Use Case                          |
| --------------- | --------- | -------- | --------------------------------- |
| `development` | 4         | 2 hours  | Testing and debugging             |
| `normal`      | 256       | 48 hours | Standard production jobs          |
| `gpu-a100`    | varies    | 48 hours | GPU workloads (check your system) |
| `large`       | 512+      | 48 hours | Large-scale parallel jobs         |

> Queue names and limits vary by system. Run `sinfo` to see available queues on your system.

---

## Quick Reference

<div class="os-only os-mac" markdown="1">

| Task                     | Command                                        |
| ------------------------ | ---------------------------------------------- |
| Log in                   | `ssh user@system_hostname.tacc.utexas.edu`   |
| Upload a file            | `scp file user@ls6.tacc.utexas.edu:/work2/...` |
| Download a file          | `scp user@ls6.tacc.utexas.edu:/work2/.../file .` |
| Check allocation balance | `allocations` or `/usr/local/etc/taccinfo` |
| See available modules    | `module avail`                               |
| Load Python              | `module load python3`                        |
| Submit a job             | `sbatch script.sh`                           |
| Check your jobs          | `squeue -u $USER`                            |
| Cancel a job             | `scancel <job_id>`                           |
| Check disk usage         | `du -sh $WORK`                               |
| Download files to TACC   | `wget https://your-link-here`                |

</div>

<div class="os-only os-linux" markdown="1">

| Task                     | Command                                        |
| ------------------------ | ---------------------------------------------- |
| Log in                   | `ssh user@system_hostname.tacc.utexas.edu`   |
| Upload a file            | `scp file user@ls6.tacc.utexas.edu:/work2/...` |
| Download a file          | `scp user@ls6.tacc.utexas.edu:/work2/.../file .` |
| Check allocation balance | `allocations` or `/usr/local/etc/taccinfo` |
| See available modules    | `module avail`                               |
| Load Python              | `module load python3`                        |
| Submit a job             | `sbatch script.sh`                           |
| Check your jobs          | `squeue -u $USER`                            |
| Cancel a job             | `scancel <job_id>`                           |
| Check disk usage         | `du -sh $WORK`                               |
| Download files to TACC   | `wget https://your-link-here`                |

</div>

<div class="os-only os-windows" markdown="1">

| Task                       | Command (in PowerShell)                                 |
| -------------------------- | ------------------------------------------------------- |
| Check that SSH is installed | `ssh -V`                                              |
| Log in                     | `ssh user@ls6.tacc.utexas.edu`                          |
| Upload a file              | `scp C:\path\file user@ls6.tacc.utexas.edu:/work2/...`  |
| Upload a folder            | `scp -r C:\path\folder user@ls6.tacc.utexas.edu:/work2/...` |
| Download a file            | `scp user@ls6.tacc.utexas.edu:/work2/.../file .`        |
| Edit a script on TACC      | `nano my_script.sh`                                     |
| Fix Windows line endings   | `dos2unix my_script.sh` (run on TACC)                   |
| Submit a job (on TACC)     | `sbatch script.sh`                                      |
| Check your jobs (on TACC)  | `squeue -u $USER`                                       |
| Download files to TACC     | `wget https://your-link-here` (run on TACC)             |

</div>

---

## Getting Help

- **Troubleshooting and FAQ:** [troubleshooting.html](troubleshooting.html)
- **TACC Documentation:** [https://docs.tacc.utexas.edu/](https://docs.tacc.utexas.edu/)
- **TACC Support Ticket:** [https://portal.tacc.utexas.edu/tacc-consulting](https://portal.tacc.utexas.edu/tacc-consulting)
- **Allocation Questions:** Contact Ashley Scruse: [ashley.scruse@morehouse.edu](mailto:ashley.scruse@morehouse.edu)

---

## Checklist Before You Start Computing

- [ ] Received TACC project invitation email
- [ ] Created TACC account using the invitation link
- [ ] MFA set up and tested
- [ ] Terminal chosen (see Step 3 for your OS)
- [ ] Successfully SSH'd into the system
- [ ] Ran a test job with `sbatch`

Once all boxes are checked, you're ready to go!
