# Baldera Reborn
**THIS MOD IS BEING DEPRECATED!** As of v108 it will cease to function without manual updates. This is because Baldera will be officially used soon. You're free to use the mod yourself, but I won't be supporting it anymore.

[Video Trailer/Short Preview](https://www.youtube.com/watch?v=jzZ50gQgXnk)
[BHS teased an official Baldera update at the end of this video, on the same day as this mod.](https://www.youtube.com/watch?v=RPeTUvFMqKU)
[KTERA IS OFFICIALLY USING BALDERA](https://playtera.co.kr/news/updates/492?page_from=1)

**Baldera Reborn** focuses on making the region of Baldera feel a little more lively. This has been accomplished by using the [TERA Toolbox](https://github.com/tera-toolbox/tera-toolbox) modding platform to add clientside NPCs to the game. I've taken dialog from all over the game, and spliced it together to create a personal artistic interpretation of what Baldera _may_ have been in its prime.

Currently, Baldera Reborn features a fully populated city, and both camps. However, nature outside of these areas is lacking NPCs. If there's enough interest, I will be more than willing to expand upon what is provided, adding NPCs to areas that lack them; and potentially even looking into adding monsters if possible. Regardless, what exists is a fully usable form of my original goal. There's a grim reality to Baldera's fate, and why the seal was put in place north of Arcadia in the first place. Will you uncover the secrets, and piece together the story of Baldera's last stand? Or, will you draw your own conclusions? The tale is yours to tell.


## Features

Baldera Reborn offers the following features:

* **150+** total NPCs and objects to help Baldera feel more alive.

* The NPCs are in the main city, and in both camps surrounding Baldera.

* A story with an intended premise, but not defined enough to kill a user's creativity to interpret the material.

* Spliced dialog for **90+** custom NPCs from all over the game to achieve the general "plot" premise.

* Valkyon soldiers have been seen tinkering with a mysterious object near the Baldera seal... Maybe you should investigate?


## Usage Notes

1. **This module may not fit everyone's definition of "ethical".**

     a. For example, this mod provides a way to access Baldera from its natural entrance at the north end of Arcadia.
     
     b. This is accomplished by using a shuttle, aka a moving platform.
     
     c. That said, **use this module at your own risk.**

2. **Despite potentially not being 100% ethical to some, this mod takes steps to ensure your safety.** There are a few systems in place to ensure that no invalid data is sent to the server. If even one of those checks fail, the mod will not function. If this is the case and you aren't comfortable editing code, please wait for an update.

3. **The NPCs spawned are FAKE.** This means that they are fully clientside, and only you can see them assuming you have the mod. Other people, even with the mod, won't see them acknowledge you whatsoever. This is a byproduct of the way the NPCs are spawned. This also means it's safe in that regard, others can't see you talking to fake NPCs.

4. **With all Toolbox modules, use caution when talking about it in-game.** I won't say that this module is 100% safe, but it should be at least 99.99% safe as long as you use common sense. Don't use the shuttle when other people you don't know are around, and don't tell people that you have NPCs added to the game.


## Additional Mods
This mod is best paired with one or more of the below:

[Ambush's Baldera Map](https://github.com/ambushing/Baldera-Map) : Adds a minimap to Baldera.

[Salty's Dynamic Day](https://github.com/SaltyMonkey/dynamic-day) : Changes your visual based on system or server time. Use this, **OR** use Aerogasm below, don't use both.

[nmod's Aerogasm](https://github.com/nmods/aerogasm) : Alternative to Dynamic Day with a higher variance on effects. Use this **OR** use Dynamic Day above, don't use both.

[sol's Jukebox](https://github.com/memeslash/jukebox) : Adds a portable jukebox that can play in-game music for you.


## Credits
[Snug](https://github.com/Snugglez) : Providing a dialog dump, and answering a lot of questions during this mod's creation.

All prerelease testers, who helped seek out bugs, and gave input about many factors.


## Changelog
<details>

### (DEPRECATED) 1.0.5 (7/23/2021)
- Added deprecation warning, as KTERA is officially using Baldera soon.
- This is the final version. If you wish to continue using Baldera Reborn as of v108, you will need to manually update it and disable auto updates.
- Additionally, when non Korean regions get the Baldera update, this mod will be redundant, as there will be NPCs in Baldera.

### 1.0.4 (6/29/2021)
- Added v107 support.

### 1.0.3 (6/8/2021)
- Added v106 support.

### 1.0.2 (4/29/2021)
- Added v105 support.
- Updated error messages.

### 1.0.1 (4/26/2021)
- Updated readme to include both the fact that BHS made an official teaser, as well as additional mods.
  
### 1.0 (4/26/2021)
- Initial public release.
- Same features as 1.0 Release Candidate 1.

### 1.0 Release Candidate 1 (4/23/2021)
- Removed references to TBA assets, as the next KR patch is likely removing them.

### Prerelease 0.9.5 (4/20/2021)
- Fixed issue where teleporting on the shuttle would deny C_PLAYER_LOCATION permanently.
- Added Zolyn across the seal to bring the shuttle over from the inside.
- Changed the announce message to a fancier on-screen one **and** in chat.
- Minor code refactoring.
- Pending upgrade to Release Candidate if no issues are found in 72 hours.

### Prerelease 0.9.4 (4/19/2021)
- Fixed issue where C_PLAYER_LOCATION was not blocked while on our fake shuttle.
- Changed the NPC and dialog for the shuttle NPC to fit in better thematically.
- Added a message in chat when approaching the Baldera seal in Arcadia.
- Re-implemented button support for the shuttle NPC.
- The shuttle will now return to its starting position.

### Prerelease 0.9.3 (4/19/2021)
- Added "It will not function for your safety" to the error if your publisher is not Gameforge.
- Changed two "else if" statements to "if" statements, ensuring multiple errors will be posted in console if applicable.
- Edits to module.json.

### Prerelease 0.9.2 (4/18/2021)
- Refactored error checking and error messages.

### Prerelease 0.9.1 (4/17/2021)
- Refactored comments to be much more beginner friendly.
- Added "errorPresent" check, to disallow sending the server invalid code if anything goes wrong.
- Added shuttle NPC to take you across Baldera's seal in Arcadia.
- Fixed minor NPC issues and typos in the code.

### Prerelease 0.9 (4/17/2021)
- Initial closed beta to a few testers.

</details>
