# Git setup script for Runes over Lightning project
Write-Host "Setting up git repository..."

# Add all files
git add .

# Make initial commit
git commit -m "Initial project setup: README, .gitignore, and environment scaffolding"

# Add remote origin
git remote add origin git@github.com:Runes-over-Lightning-Initiative-ROL/runes-lightning-dev.git

# Set main branch
git branch -M main

# Push to remote
git push -u origin main

Write-Host "Git setup completed successfully!" 