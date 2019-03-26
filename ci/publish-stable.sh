echo "Publishing Stable"
echo "Running Prepublish"
yarn publish:prepublish
# publish stable manually
echo "Bumping version"
yarn publish:version-stable
echo "Publishing Stable Version to NPM"
yarn publish:stable
echo "Commit Git Refs"
git add .
git commit --amend --no-edit
git push origin master