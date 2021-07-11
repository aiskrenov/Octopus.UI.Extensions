# Octopus.UI.Extensions
Chrome plugin which reformats the Octopus Deploy dashboard into a more detailed view with link to build system and source control

With complex CICD systems it's kinda hard to track what was built where and how. In order to partially address this I encoded some information in the release names and packages and drafted this sloppy plugin to extract the encoded data and make it more human-readable with the possibility to follow some useful links.

The pattern for the release and packages names I ended up with is \<build-version\>-\<release-type\>-\<branch-name\>-\<commit-hash\>. E.g. 2107.1023.5821-rls-master-92f1ec5 

This would look in Octopus Deploy like this:
  
![image](https://user-images.githubusercontent.com/11503830/125179244-3e82d000-e230-11eb-8fd0-8c2ffcaa6e3e.png)

The plugin will transform this view into something like this:
  
![image](https://user-images.githubusercontent.com/11503830/125179334-1cd61880-e231-11eb-8da4-eec0737105af.png)

If it turns out useful I'll make more generic implementation.
