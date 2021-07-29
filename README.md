# ios ci/cd machine

1. create a `~/.bash_sessions_disable` file so we don't create new sessions every run
1. run `docker system prune -a` to make more space and remove unused docker images

# commit messages

1. use angular standards https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits

# android deployment

1. currently, Android react native has issues when selecting hermes. It won't build on Linux. So we need to deploy from local machine until the hermes bug is cleared. We deal with this because hermes has much better performance on android.
"# RetrieverApp_ReactNative" 
