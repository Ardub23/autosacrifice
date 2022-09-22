Automates the entire process of finding mutations and eventually sacrificing the garden. It automatically plants and harvests, switches soil, removes weeds, and sacrifices full seed logs, making the garden fully AFK. It takes just over 4 days to sacrifice on average when Supreme Intellect is enabled, which amounts to about 2.8 bonus sugar lumps per day.

There are two requirements for using the mod: a fully upgraded (6x6) garden, and a very large amount of cookies relative to your CpS. The first is because coding this for all garden sizes would be a nightmare, and I also think it's best from a player experience standpoint to sacrifice manually at least once. The large bank requirement is just due to many plants being pretty expensive (the 32 queenbeet setup to unlock the JQB is particularly pricy). Therefore, the ideal time to use this mod is after you've done an endgame combo and only have sugar lump related achievements left. Steam achievements are not disabled because of these requirements.

The mod adds a button at the bottom of the options menu to enable the effect -- click that to start the process. It will take action only after every garden tick (or if you try to modify the garden) and notify you when it's targeting a new seed. It should be compatible with whatever current plants you have in the garden, but it's probably best to remove anything you've planted manually. It should be a given, but always back up your save before using this mod or any other.

I hope you enjoy the mod! If you run into bugs or have feature requests, let me know.

---

Seed order: this is the result of a fair amount of work -- if you have ideas for how to make this more efficient, let me know!

```
=== Queenbeets ===
1. Baker's wheat
2. Meddleweed
3. Bakeberry
4. Thumbcorn
5. Cronerice
6. Crumbspore
7. Brown mold
8. White mildew
9. Chocoroot
10. Queenbeet
11. Juicy queenbeet

=== Drowsyfern and Elderwort ===
12. Gildmillet
13. Ordinary clover
14. Green rot
15. Shimmerlily
16. Elderwort
17. Keenmoss
18. Drowsyfern
19. Wardlichen

=== Everdaisy and Ichorpuff ===
20. White chocoroot
21. Tidygrass
22. Everdaisy
23. Ichorpuff

=== Crumbspore Stuff ===
24. Doughshroom
25. Wrinklegill
26. Glovemorel
27. Cheapcap
28. Fool's Bolete

=== The Rest ===
29. Whiskerbloom
30. Chimerose
31. Nursetulip
32. Duketater
33. Shriekbulb
34. Golden clover
```

---

v1.1: Moved controls to the bottom of the options menu and added controls for not automatically sacrificing when the seed log is complete and not planting when buffs are active. The start button also no longer needs to be pressed every time the game is opened.

v1.2 Reworked seed order, added a check to remove duplicate non-unlocked plants (e.g. multiple Duketaters cluttering up the JQB setup), and added a setting to disable automatic soil rotation.

v1.3: Made a few seeds more efficient by suggestion. Shriekbulbs now use immature Duketaters instead of Elderwort if they don't arise from the JQB setup, Wardlichen uses Keenmoss instead of White Mildew because Keenmoss doesn't spread and therefore decrease the overall mutation chance, and the setups for Everdaisies and Ichorpuffs have been revised to increase the number of mutation plots available. Finally, when the only plants left growing are an Everdaisy and/or a JQB (this is almost always the final state of the garden before sacrificing), they're surrounded with Elderwort to slightly speed up the process.

v1.4: Added support for parlay mutations: certain plants with a long maturation time and high mutation chance will be used as a mutation opportunity before it’s harvested for the first time. For example, the first Bakeberry is used to attempt a Queenbeet mutation if Chocoroot is already unlocked by the time it needs to be planted, and the first Cronerice is used to attempt a Gildmillet mutation. Combined with an improved order placing Everdaisy earlier, the average time to sacrifice has shorted from just under 5 days to just over 4. Parlay mutations can make the garden look pretty chaotic, but everything is still kept careful track of under the hood. Finally, notifications now use more appropriate icons and are permanent (if the fast notifications setting is off).

v1.5: Switched to using a 5x5 setup for JQBs that can multitask in the 11 free spots, so that more plants (particularly Elderwort) can be available when a JQB is achieved. It’s immediately surrounded by 8 Elderwort to speed up its growth by about 20%. The seed order has been shuffled around to prioritize Elderwort and Everdaisies.

A few miscellaneous things: the avoid CpS buffs setting now ignores loans, the setup for Chimerose now staggers its plants correctly, and the JQB setup is much stingier with how many plants it requires to be active, so fewer ticks are spent with no valid mutation spots. It also waits until its entire plot is clear before planting for the first time since a few gaps in the setup can make it next to worthless. Finally, the Golden Clover setup is now a slightly more efficient one.