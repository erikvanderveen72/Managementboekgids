#!/usr/bin/env bash
# Vercel "Ignored Build Step" voor managementboekgids.
# Gebruik in Vercel: Settings -> Git -> Ignored Build Step
# Zet commando op: bash scripts/vercel-ignore.sh
#
# Exit 0 = skip build (Vercel deployt niet)
# Exit 1 = doorgaan met build
#
# Alleen de live-branch genereert deployments. Alle andere branches
# (brainstorm, main, etc.) worden overgeslagen om build-minuten te sparen.
set -e

LIVE_BRANCH="claude/review-project-setup-smbxU"

if [ "$VERCEL_GIT_COMMIT_REF" = "$LIVE_BRANCH" ]; then
  echo "Live branch ($LIVE_BRANCH) - build doorzetten"
  exit 1
fi

echo "Branch '$VERCEL_GIT_COMMIT_REF' is niet de live-branch - build overgeslagen"
exit 0
