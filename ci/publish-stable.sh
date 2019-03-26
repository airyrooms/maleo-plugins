echo "Publishing Stable"
echo "Running Prepublish"
yarn publish:prepublish
# publish stable manually
echo "Bumping version"
yarn publish:version-stable

echo "Publishing Plugins to NPM. More info $TRAVIS_BUILD_WEB_URL"
if ! yarn publish:stable; then
  wget https://raw.githubusercontent.com/DiscordHooks/travis-ci-discord-webhook/verbose/send.sh
  chmod +x send.sh
  ./send.sh failure $DISCORD_WEBHOOK_URL
else
  wget https://raw.githubusercontent.com/DiscordHooks/travis-ci-discord-webhook/verbose/send.sh
  chmod +x send.sh
  ./send.sh success $DISCORD_WEBHOOK_URL
fi

echo "Commit Git Refs"
git add .
git commit --amend --no-edit
git push origin master