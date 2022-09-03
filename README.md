# AutoSacrifice: Fully AFK Garden

## Loading it

If you're using [CCMM](https://github.com/klattmose/CookieClickerModManager), load `https://cdn.jsdelivr.net/gh/90259025/autosacrifice@main/main.js`. If not, copy and paste the contents of `main.js` into your browser console on the Cookie Clicker site. On Steam, just use the workshop.

## What it does

Automates the entire process of finding mutations and eventually sacrificing the garden. It automatically plants and harvests, switches soil, removes weeds, and sacrifices full seed logs, making the garden fully AFK. It takes just under 5 days to sacrifice on average when Supreme Intellect is enabled, which amounts to about 2.2 bonus sugar lumps per day.

There are two requirements for using the mod: a fully upgraded (6x6) garden, and a very large amount of cookies relative to your CpS. The first is because coding this for all garden sizes would be a nightmare, and I also think it's best from a player experience standpoint to sacrifice manually at least once. The large bank requirement is just due to many plants being pretty expensive (the 32 queenbeet setup to unlock the JQB is particularly pricy). Therefore, the ideal time to use this mod is after you've done an endgame combo and only have sugar lump related achievements left. Steam achievements aren't disabled because of these requirements.

The mod adds a button at the bottom of the options menu to enable the effect -- click that to start the process. It will take action after every garden tick and notify you when it's targeting a new seed. It should be compatible with whatever current plants you have in the garden, but it's probably best to remove anything you've planted manually. It should be a given, but always back up your save before using this mod or any other.

I hope you enjoy the mod! If you run into bugs or have feature requests, let me know.



Seed order: this is the result of a fair amount of work -- if you have ideas for how to make this more efficient, let me know!

```
=== Queenbeets ===
1. Baker's wheat
2. Mettleweed
3. Thumbcorn
4. Bakeberry
5. Cronerice
6. Crumbspore
7. Brown mold
8. White mildew
9. Chocoroot
10. Queenbeet
11. Juicy queenbeet
12. Duketater
13. Shriekbulb

=== Tidygrass ===
14. White chocoroot
15. Tidygrass

=== Cronerice Stuff ===
16. Gildmillet
17. Ordinary clover
18. Green rot
19. Shimmerlily
20. Elderwort
21. Wardlichen

=== Crumbspore Stuff ===
22. Doughshroom
23. Wrinklegill
24. Glovemorel
25. Cheapcap
26. Fool's Bolete

=== Drowsyfern ===
27. Keenmoss
28. Drowsyfern

=== Elderwort Stuff ===
29. Ichorpuff
30. Everdaisy

=== The Rest ===
31. Whiskerbloom
32. Chimerose
33. Nursetulip
34. Golden clover
```



v1.1: Moved controls to the bottom of the options menu and added controls for not automatically sacrificing when the seed log is complete and not planting when buffs are active. The start button also no longer needs to be pressed every time the game is opened.

v1.2 Reworked seed order, added a check to remove duplicate non-unlocked plants (e.g. multiple Duketaters cluttering up the JQB setup), and added a setting to disable automatic soil rotation.

v1.3: Made a few seeds more efficient by suggestion. Shriekbulbs now use immature Duketaters instead of Elderwort if they don't arise from the JQB setup, Wardlichen uses Keenmoss instead of White Mildew because Keenmoss doesn't spread and therefore decrease the overall mutation chance, and the setups for Everdaisies and Ichorpuffs have been revised to increase the number of mutation plots available. Finally, when the only plants left growing are an Everdaisy and/or a JQB (this is almost always the final state of the garden before sacrificing), they're surrounded with Elderwort to slightly speed up the process.