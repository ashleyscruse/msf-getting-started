#!/bin/bash
#SBATCH -J gpu_job                # Job name
#SBATCH -o gpu_job.%j.out         # Output file (%j = job ID)
#SBATCH -e gpu_job.%j.err         # Error file
#SBATCH -p gpu-a100               # GPU queue (check your system for available GPU queues)
#SBATCH -N 1                      # Number of nodes
#SBATCH -n 1                      # Number of tasks
#SBATCH -t 01:00:00               # Wall clock time (1 hour)
#SBATCH -A YOUR_ALLOCATION        # Replace with your allocation name

# Load CUDA and Python
module load cuda
module load python3

# Verify GPU is visible
nvidia-smi

# Run your GPU script
cd $WORK/my_project
python3 gpu_script.py

echo "Job finished at $(date)"
