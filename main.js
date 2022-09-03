!function()
{
    Game.registerMod("autosacrifice",
    {
        auto_sac_enabled: false,
        do_convert: false,
        avoid_cps_buffs: false,
        do_soil_rotation: false,
        
        hook_added: false,
        
        auto_sac_button: null,
        do_convert_button: null,
        avoid_cps_buffs_button: null,
        do_soil_rotation_button: null,
        
        init: function()
        {
            Game.Notify('Auto Sacrifice Loaded!',`Enable it with the button at the bottom of the options menu.`, [16, 5], 5);
            
            let MOD = this;
            
            let menu = Game.UpdateMenu;
            
            Game.UpdateMenu = function(){
                menu();
                
                if (Game.onMenu == 'prefs')
                {
                    document.querySelector("#screenreaderButton").nextElementSibling.nextElementSibling.insertAdjacentHTML("afterend", `
                        <a class="smallFancyButton prefButton option ${MOD.auto_sac_enabled ? "on" : "off"}" id="auto-sac-button" onclick="Game.toggle_auto_sac()">AutoSacrifice ${MOD.auto_sac_enabled ? "ON" : "OFF"}</a>
                        <label>(make the garden fully automatic, from planting to harvesting to sacrificing)</label>
                        <br>
                        
                        <a class="smallFancyButton prefButton option ${MOD.do_convert ? "on" : "off"}" id="do-convert-button" onclick="Game.toggle_do_convert()">Auto convert ${MOD.do_convert ? "ON" : "OFF"}</a>
                        <label>(automatically convert the garden; turn off if you want the seeds but not the lumps)</label>
                        <br>
                        
                        <a class="smallFancyButton prefButton option ${MOD.avoid_cps_buffs ? "on" : "off"}" id="avoid-cps-buffs-button" onclick="Game.toggle_avoid_cps_buffs()">Avoid CpS buffs ${MOD.avoid_cps_buffs ? "ON" : "OFF"}</a>
                        <label>(skip planting seeds if a buff is currently active)</label>
                        <br>
                        
                        <a class="smallFancyButton prefButton option ${MOD.do_soil_rotation ? "on" : "off"}" id="do-soil-rotation-button" onclick="Game.toggle_do_soil_rotation()">Auto rotate soil ${MOD.do_soil_rotation ? "ON" : "OFF"}</a>
                        <label>(automatically switch between fertilizer and wood chips)</label>
                        <br>
                    `);
                    
                    setTimeout(() =>
                    {
                        MOD.auto_sac_button = l("auto-sac-button");
                        MOD.do_convert_button = l("do-convert-button");
                        MOD.avoid_cps_buffs_button = l("avoid-cps-buffs-button");
                        MOD.do_soil_rotation_button = l("do-soil-rotation-button");
                    }, 50);
                }
            };
            
            Game.toggle_auto_sac = function()
            {
                MOD.auto_sac_enabled = !MOD.auto_sac_enabled;
                
                if (!MOD.auto_sac_enabled)
                {
                    try
                    {
                        MOD.auto_sac_button.textContent = "AutoSacrifice OFF";
                        MOD.auto_sac_button.classList.remove("on");
                        MOD.auto_sac_button.classList.add("off");
                    }
                    
                    catch(ex) {}
                    
                    if (MOD.do_convert)
                    {
                        Game.toggle_do_convert();
                    }
                    
                    if (MOD.avoid_cps_buffs)
                    {
                        Game.toggle_avoid_cps_buffs();
                    }
                    
                    if (MOD.do_soil_rotation)
                    {
                        Game.toggle_do_soil_rotation();
                    }
                }
                
                else
                {
                    try
                    {
                        MOD.auto_sac_button.textContent = "AutoSacrifice ON";
                        MOD.auto_sac_button.classList.remove("off");
                        MOD.auto_sac_button.classList.add("on");
                    }
                    
                    catch(ex) {}
                    
                    if (!MOD.do_convert)
                    {
                        Game.toggle_do_convert();
                    }
                    
                    if (!MOD.do_soil_rotation)
                    {
                        Game.toggle_do_soil_rotation();
                    }
                }
                
                MOD.add_hook();
            };
            
            Game.toggle_do_convert = function()
            {
                MOD.do_convert = !MOD.do_convert;
                
                try
                {
                    if (!MOD.do_convert)
                    {
                        MOD.do_convert_button.textContent = "Auto convert OFF";
                        MOD.do_convert_button.classList.remove("on");
                        MOD.do_convert_button.classList.add("off");
                    }
                    
                    else
                    {
                        MOD.do_convert_button.textContent = "Auto convert ON";
                        MOD.do_convert_button.classList.remove("off");
                        MOD.do_convert_button.classList.add("on");
                    }
                }
                
                catch(ex) {}
            };
            
            Game.toggle_avoid_cps_buffs = function()
            {
                MOD.avoid_cps_buffs = !MOD.avoid_cps_buffs;
                
                try
                {
                    if (!MOD.avoid_cps_buffs)
                    {
                        MOD.avoid_cps_buffs_button.textContent = "Avoid CpS buffs OFF";
                        MOD.avoid_cps_buffs_button.classList.remove("on");
                        MOD.avoid_cps_buffs_button.classList.add("off");
                    }
                    
                    else
                    {
                        MOD.avoid_cps_buffs_button.textContent = "Avoid CpS buffs ON";
                        MOD.avoid_cps_buffs_button.classList.remove("off");
                        MOD.avoid_cps_buffs_button.classList.add("on");
                    }
                }
                
                catch(ex) {}
            };
            
            Game.toggle_do_soil_rotation = function()
            {
                MOD.do_soil_rotation = !MOD.do_soil_rotation;
                
                try
                {
                    if (!MOD.do_soil_rotation)
                    {
                        MOD.do_soil_rotation_button.textContent = "Auto rotate soil OFF";
                        MOD.do_soil_rotation_button.classList.remove("on");
                        MOD.do_soil_rotation_button.classList.add("off");
                    }
                    
                    else
                    {
                        MOD.do_soil_rotation_button.textContent = "Auto rotate soil ON";
                        MOD.do_soil_rotation_button.classList.remove("off");
                        MOD.do_soil_rotation_button.classList.add("on");
                    }
                }
                
                catch(ex) {}
            };
        },
        
        
        
        save: function()
        {
            return `${this.fertilizer_ticks}|${this.woodchips_ticks}|${this.auto_sac_enabled ? 1 : 0}|${this.do_convert ? 1 : 0}|${this.avoid_cps_buffs ? 1 : 0}|${this.do_soil_rotation ? 1 : 0}`;
        },
        
        
        
        load: function(str)
        {
            if (str.indexOf("|") === -1)
            {
                this.fertilizer_ticks = 0;
                this.woodchips_ticks = 0;
                
                return;
            }
            
            let components = str.split("|");
            
            this.fertilizer_ticks = parseInt(components[0]);
            this.woodchips_ticks = parseInt(components[1]);
            
            setTimeout(() =>
            {
                if (!!parseInt(components[2]) !== this.auto_sac_enabled)
                {
                    Game.toggle_auto_sac();
                }
                
                if (!!parseInt(components[3]) !== this.do_convert)
                {
                    Game.toggle_do_convert();
                }
                
                if (!!parseInt(components[4]) !== this.avoid_cps_buffs)
                {
                    Game.toggle_avoid_cps_buffs();
                }
                
                if (!!parseInt(components[5]) !== this.do_soil_rotation)
                {
                    Game.toggle_do_soil_rotation();
                }
            }, 500);
        },
        
        
        
        add_hook: function()
        {
            if (this.hook_added)
            {
                return;
            }
            
            this.hook_added = true;
            
            let MOD = this;
            
            let build_plot = Game.ObjectsById[2].minigame.buildPlot;
            
            Game.ObjectsById[2].minigame.buildPlot = function()
            {
                build_plot();
                
                if (MOD.auto_sac_enabled)
                {
                    MOD.post_tick_logic();
                }
            };
        },
        
        
        
        seed_order:
        [
            "meddleweed",
            "thumbcorn",
            "bakeberry",
            "cronerice",
            
            "crumbspore",
            "brownMold",
            "whiteMildew",
            "chocoroot",
            "queenbeet",
            "queenbeetLump",
            "duketater",
            "shriekbulb",
            
            "whiteChocoroot",
            "tidygrass",
            
            "gildmillet",
            "clover",
            "greenRot",
            "shimmerlily",
            
            "doughshroom",
            "wrinklegill",
            "glovemorel",
            "cheapcap",
            "foolBolete",
            
            "keenmoss",
            "drowsyfern",
            
            "elderwort",
            "wardlichen",
            
            "ichorpuff",
            "everdaisy",
            
            "whiskerbloom",
            "chimerose",
            "nursetulip",
            
            "goldenClover"
        ],
        
        seed_to_unlock: "",
        
        
        
        //The type is 0 for 2x of one plant, 1 for 2 different plants, and 2 for a weird setup that must be explicitly defined.
        mutation_setups:
        {
            thumbcorn:
            {
                id: 1,
                type: 0,
                parents: ["bakerWheat"]
            },
            
            bakeberry:
            {
                id: 8,
                type: 0,
                parents: ["bakerWheat"]
            },
            
            whiteMildew:
            {
                id: 11,
                type: 0,
                parents: ["brownMold"]
            },
            
            doughshroom:
            {
                id: 24,
                type: 0,
                parents: ["crumbspore"]
            },
            
            duketater:
            {
                id: 22,
                type: 0,
                parents: ["queenbeet"]
            },
            
            nursetulip:
            {
                id: 16,
                type: 0,
                parents: ["whiskerbloom"]
            },
            
            goldenClover:
            {
                id: 5,
                type: 0,
                parents: ["clover"],
                
                tiles: [[0, 0], [0, 1], [0, 3], [0, 5], [1, 1], [1, 3], [1, 5], [2, 0], [2, 3], [2, 5], [3, 0], [3, 2], [3, 5], [4, 0], [4, 2], [4, 4], [5, 0], [5, 2], [5, 4], [5, 5]],
            
                empty_tiles: [[0, 2], [0, 4], [1, 0], [1, 2], [1, 4], [2, 1], [2, 2], [2, 4], [3, 1], [3, 3], [3, 4], [4, 1], [4, 3], [4, 5], [5, 1], [5, 3]]
            },
            
            queenbeetLump:
            {
                id: 21,
                type: 0,
                parents: ["queenbeet"],
                
                tiles: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 0], [1, 2], [1, 3], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [4, 0], [4, 2], [4, 3], [4, 5], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]],
            
                empty_tiles: [[1, 1], [1, 4], [4, 1], [4, 4]]
            },
            
            shriekbulb:
            {
                id: 30,
                type: 0,
                parents: ["duketater"],
            },
            
            
            
            cronerice:
            {
                id: 2,
                type: 1,
                parents: ["thumbcorn", "bakerWheat"]
            },
            
            gildmillet:
            {
                id: 3,
                type: 1,
                parents: ["thumbcorn", "cronerice"]
            },
            
            chocoroot:
            {
                id: 9,
                type: 1,
                parents: ["bakerWheat", "brownMold"]
            },
            
            wrinklegill:
            {
                id: 28,
                type: 1,
                parents: ["brownMold", "crumbspore"]
            },
            
            glovemorel:
            {
                id: 25,
                type: 1,
                parents: ["thumbcorn", "crumbspore"]
            },
            
            clover:
            {
                id: 4,
                type: 1,
                parents: ["bakerWheat", "gildmillet"]
            },
            
            queenbeet:
            {
                id: 20,
                type: 1,
                parents: ["chocoroot", "bakeberry"]
            },
            
            whiteChocoroot:
            {
                id: 10,
                type: 1,
                parents: ["whiteMildew", "chocoroot"]
            },
            
            wardlichen:
            {
                id: 18,
                type: 1,
                parents: ["keenmoss", "cronerice"]
            },
            
            shimmerlily:
            {
                id: 6,
                type: 1,
                parents: ["gildmillet", "clover"]
            },
            
            tidygrass:
            {
                id: 31,
                type: 1,
                parents: ["bakerWheat", "whiteChocoroot"]
            },
            
            greenRot:
            {
                id: 29,
                type: 1,
                parents: ["whiteMildew", "clover"]
            },
            
            elderwort:
            {
                id: 7,
                type: 1,
                parents: ["shimmerlily", "cronerice"]
            },
            
            whiskerbloom:
            {
                id: 14,
                type: 1,
                parents: ["whiteChocoroot", "shimmerlily"]
            },
            
            cheapcap:
            {
                id: 26,
                type: 1,
                parents: ["shimmerlily", "crumbspore"]
            },
            
            keenmoss:
            {
                id: 19,
                type: 1,
                parents: ["greenRot", "brownMold"]
            },
            
            foolBolete:
            {
                id: 27,
                type: 1,
                parents: ["greenRot", "doughshroom"]
            },
            
            chimerose:
            {
                id: 15,
                type: 1,
                parents: ["shimmerlily", "whiskerbloom"]
            },
            
            drowsyfern:
            {
                id: 17,
                type: 1,
                parents: ["chocoroot", "keenmoss"]
            },
            
            ichorpuff:
            {
                id: 33,
                type: 1,
                parents: ["crumbspore", "elderwort"],
                
                fast_tiles: [[1, 1], [1, 4], [5, 1], [5, 4]],
                
                slow_tiles: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
            
                empty_tiles: [[1, 0], [1, 2], [1, 3], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [5, 0], [5, 2], [5, 3], [5, 5]]
            },
            
            everdaisy:
            {
                id: 32,
                type: 1,
                parents: ["tidygrass", "elderwort"],
                
                fast_tiles: [[1, 0], [1, 2], [1, 3], [1, 5], [2, 0], [2, 2], [2, 5], [4, 0], [4, 5], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]],
                
                slow_tiles: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
            
                empty_tiles: [[1, 1], [1, 4], [2, 1], [2, 3], [2, 4], [4, 1], [4, 2], [4, 3], [4, 4]]
            },
            
            
            
            bakerWheat:
            {
                id: 0
            },
            
            meddleweed:
            {
                id: 13,
                type: 2,
                parents: []
            },
            
            brownMold:
            {
                id: 12,
                type: 2,
                parents: ["meddleweed"]
            },
            
            crumbspore:
            {
                id: 23,
                type: 2,
                parents: ["meddleweed"]
            }
        },
        
        
        
        fertilizer_ticks: 0,
        woodchips_ticks: 0,
        
        last_fertilizer_ticks: 0,
        last_woodchips_ticks: 0,
        
        num_iterations: -1,
        
        do_add_elderwort: false,
        
        post_tick_logic: function()
        {
            //Debug for testing
            /*
            Game.ObjectsById[2].minigame.soils["fertilizer"].tick = .00005;
            Game.ObjectsById[2].minigame.soils["woodchips"].tick = .00005;
            Game.ObjectsById[2].minigame.nextSoil = 0;
            */
            
            
            
            if (Game.ObjectsById[2].minigame.soil === 1)
            {
                this.fertilizer_ticks++;
            }
            
            else
            {
                this.woodchips_ticks++;
            }
            
            
            
            if (this.ticks_until_fast_plants > 0)
            {
                this.ticks_until_fast_plants--;
            }
            
            
            
            //If we find what we're looking for, we switch to fertilizer, and then clear the plot.
            if (this.find_target())
            {
                this.change_soil(1);
                
                this.ticks_until_fast_plants = -1;
            }
            
            
            
            this.add_elderwort();
            
            this.select_next_target();
            
            this.remove_unlocked_plants();
            
            this.remove_non_unlocked_duplicates();
            
            //Sometimes we may be in a state where we don't have the ability to grow anything cause we're waiting on a ton of stuff to grow.
            if (this.seed_to_unlock === "")
            {
                return;
            }
            
            
            
            let setup = this.mutation_setups[this.seed_to_unlock];
            
            if (setup.type === 0)
            {
                this.unlock_type_0_logic(...(setup.parents));
                
                return;
            }
            
            if (setup.type === 1)
            {
                this.unlock_type_1_logic(...(setup.parents));
                
                return;
            }
            
            
            
            if (this.seed_to_unlock === "meddleweed")
            {
                this.unlock_meddleweed_logic();
                
                return;
            }
            
            if (this.seed_to_unlock === "crumbspore" || this.seed_to_unlock === "brownMold")
            {
                this.unlock_crumbspore_brownMold_logic();
                
                return;
            }
        },
        
        
        
        //When there's just a JQB or Everdaisy left growing, surround it with Elderwort.
        add_elderwort: function()
        {
            this.do_add_elderwort = true;
            
            for (let i = 0; i < this.seed_order.length; i++)
            {
                let plant = Game.ObjectsById[2].minigame.plants[this.seed_order[i]];
                
                if (!(plant.key === "queenbeetLump" || plant.key === "everdaisy" || plant.unlocked))
                {
                    this.do_add_elderwort = false;
                    
                    break;
                }
            }
            
            
            
            if (this.do_add_elderwort)
            {
                for (let i = 0; i < 6; i++)
                {
                    for (let j = 0; j < 6; j++)
                    {
                        let id = Game.ObjectsById[2].minigame.plot[i][j][0] - 1;
                        
                        if (id === this.mutation_setups["queenbeetLump"].id || id === this.mutation_setups["everdaisy"].id )
                        {
                            //These two never occur in the outer edge of the garden, so we can skip inbounds checks.
                            for (let k = -1; k <= 1; k++)
                            {
                                for (let l = -1; l <= 1; l++)
                                {
                                    if (Game.ObjectsById[2].minigame.plot[i + k][j + l][0] === 0)
                                    {
                                        this.plant_seed(this.mutation_setups["elderwort"].id, j + l, i + k);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        
        
        
        //Find the first non-unlocked seed and target it.
        select_next_target: function()
        {
            let old_unlock = this.seed_to_unlock;
            
            this.seed_to_unlock = "";
            
            for (let i = 0; i < this.seed_order.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plants[this.seed_order[i]].unlocked)
                {
                    continue;
                }
                
                let parents = this.mutation_setups[this.seed_order[i]].parents;
                
                if (parents.length > 0 && !Game.ObjectsById[2].minigame.plants[parents[0]].unlocked)
                {
                    continue;
                }
                
                if (parents.length > 1 && !Game.ObjectsById[2].minigame.plants[parents[1]].unlocked)
                {
                    continue;
                }
                
                let id = this.mutation_setups[this.seed_order[i]].id;
                
                let currently_growing = false;
                
                for (let i = 0; i < 6; i++)
                {
                    for (let j = 0; j < 6; j++)
                    {
                        if (Game.ObjectsById[2].minigame.plot[i][j][0] - 1 === id)
                        {
                            currently_growing = true;
                            
                            break;
                        }
                    }
                    
                    if (currently_growing)
                    {
                        break;
                    }
                }
                
                if (currently_growing)
                {
                    continue;
                }
                
                this.seed_to_unlock = this.seed_order[i];
                
                if (this.seed_to_unlock !== old_unlock)
                {
                    Game.Notify('Auto Sacrifice', `Targeting ${Game.ObjectsById[2].minigame.plants[this.seed_order[i]].name}`, [16, 5], 5);
                    
                    this.ticks_until_fast_plants = -1;
                }
                
                break;
            }
            
            
            
            if (this.seed_to_unlock === "")
            {
                //Possibly time to sacrifice!
                for (let i = 0; i < this.seed_order.length; i++)
                {
                    if (!Game.ObjectsById[2].minigame.plants[this.seed_order[i]].unlocked)
                    {
                        return;
                    }
                }
                
                if (!this.do_convert)
                {
                    return;
                }
                
                Game.ObjectsById[2].minigame.convert();
                
                this.seed_to_unlock = "meddleweed";
                
                
                
                this.num_iterations++;
                
                if (this.num_iterations === 0)
                {
                    this.fertilizer_ticks = 0;
                    this.woodchips_ticks = 0;
                }
                
                else
                {
                    console.log(`Sacrificed in ${this.fertilizer_ticks - this.last_fertilizer_ticks} fertilizer ticks and ${this.woodchips_ticks - this.last_woodchips_ticks} woodchips ticks. Current average: ${Math.round(this.fertilizer_ticks / this.num_iterations)}, ${Math.round(this.woodchips_ticks / this.num_iterations)}`);
                    
                    this.last_fertilizer_ticks = this.fertilizer_ticks;
                    this.last_woodchips_ticks = this.woodchips_ticks;
                }
                
                Game.Notify('Auto Sacrifice', `Targeting Meddleweed`, [16, 5], 5);
            }
        },
        
        
        
        find_target: function()
        {
            let found_target = false;
            
            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 6; j++)
                {
                    let tile = Game.ObjectsById[2].minigame.plot[i][j];
                    
                    if (tile[0] === 0)
                    {
                        continue;
                    }
                    
                    let plant = Game.ObjectsById[2].minigame.plantsById[tile[0] - 1];
                    
                    if (plant.key === this.seed_to_unlock)
                    {
                        //Remove duplicates.
                        if (found_target)
                        {
                            Game.ObjectsById[2].minigame.harvest(j, i, true);
                        }
                        
                        
                        
                        if (tile[1] >= plant.mature)
                        {
                            Game.ObjectsById[2].minigame.harvest(j, i, true);
                            
                            this.select_next_target();
                        }
                        
                        else
                        {
                            found_target = true;
                        }
                    }
                    
                    else if (!Game.ObjectsById[2].minigame.plants[plant.key].unlocked && tile[1] >= plant.mature)
                    {
                        Game.ObjectsById[2].minigame.harvest(j, i, true);
                    }
                }
            }
            
            return found_target;
        },
        
        
        
        remove_unlocked_plants: function(ignore_parents = false)
        {
            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 6; j++)
                {
                    let tile = Game.ObjectsById[2].minigame.plot[i][j];
                    
                    if (tile[0] === 0)
                    {
                        continue;
                    }
                    
                    let plant = Game.ObjectsById[2].minigame.plantsById[tile[0] - 1];
                    
                    if (Game.ObjectsById[2].minigame.plants[plant.key].unlocked && (ignore_parents || this.seed_to_unlock === "" || this.mutation_setups[this.seed_to_unlock].parents.indexOf(plant.key) === -1))
                    {
                        if (this.do_add_elderwort && plant.key === "elderwort")
                        {
                            continue;
                        }
                        
                        Game.ObjectsById[2].minigame.harvest(j, i, true);
                    }
                }
            }
        },
        
        
        
        remove_non_unlocked_duplicates: function()
        {
            let non_unlocked_plants = {};
            
            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 6; j++)
                {
                    let tile = Game.ObjectsById[2].minigame.plot[i][j];
                    
                    if (tile[0] === 0)
                    {
                        continue;
                    }
                    
                    let plant = Game.ObjectsById[2].minigame.plantsById[tile[0] - 1];
                    
                    if (!Game.ObjectsById[2].minigame.plants[plant.key].unlocked)
                    {
                        if (typeof non_unlocked_plants[plant.key] === "undefined")
                        {
                            non_unlocked_plants[plant.key] = [];
                        }
                        
                        non_unlocked_plants[plant.key].push([i, j]);
                    }
                }
            }
            
            for (let key in non_unlocked_plants)
            {
                if (non_unlocked_plants[key].length > 1)
                {
                    let max_age = 0;
                    
                    for (let i = 0; i < non_unlocked_plants[key].length; i++)
                    {
                        let row = non_unlocked_plants[key][i][0];
                        let col = non_unlocked_plants[key][i][1];
                        
                        let tile = Game.ObjectsById[2].minigame.plot[row][col];
                        
                        max_age = Math.max(max_age, tile[1]);
                    }
                    
                    for (let i = 0; i < non_unlocked_plants[key].length; i++)
                    {
                        let row = non_unlocked_plants[key][i][0];
                        let col = non_unlocked_plants[key][i][1];
                        
                        let tile = Game.ObjectsById[2].minigame.plot[row][col];
                        
                        if (tile[1] < max_age)
                        {
                            Game.ObjectsById[2].minigame.harvest(col, row, true);
                        }
                    }
                }
            }
        },
        
        
        
        unlock_type_0_logic: function(parent)
        {
            let id = this.mutation_setups[parent].id;
            
            let intact = 0;
            
            let tiles = [];
            let empty_tiles = [];
            
            if (typeof this.mutation_setups[this.seed_to_unlock].tiles !== "undefined")
            {
                tiles = this.mutation_setups[this.seed_to_unlock].tiles;
                
                empty_tiles = this.mutation_setups[this.seed_to_unlock].empty_tiles;
            }
            
            else
            {
                tiles = [[0, 1], [1, 1], [2, 1], [4, 1], [5, 1], [0, 4], [1, 4], [3, 4], [4, 4], [5, 4]];
                
                empty_tiles = [[0, 0], [0, 2], [0, 3], [0, 5], [1, 0], [1, 2], [1, 3], [1, 5], [2, 0], [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 1], [3, 2], [3, 3], [3, 5], [4, 0], [4, 2], [4, 3], [4, 5], [5, 0], [5, 2], [5, 3], [5, 5]];
            }
            
            //If more than half the plants are missing, we scrap and replant.
            for (let i = 0; i < tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[tiles[i][0]][tiles[i][1]][0] - 1 === id)
                {
                    intact++;
                }
            }
            
            if (intact <= tiles.length / 2)
            {
                //Easy -- just plant a bunch.
                this.remove_unlocked_plants(true);
                
                for (let i = 0; i < tiles.length; i++)
                {
                    if (Game.ObjectsById[2].minigame.plot[tiles[i][0]][tiles[i][1]][0] === 0)
                    {
                        this.plant_seed(id, tiles[i][1], tiles[i][0]);
                    }
                }
            }
            
            
            
            //In the unique case where the slow plant is immortal, we should always try to fill gaps.
            if (Game.ObjectsById[2].minigame.plants[parent].immortal)
            {
                for (let i = 0; i < tiles.length; i++)
                {
                    if (Game.ObjectsById[2].minigame.plot[tiles[i][0]][tiles[i][1]][0] === 0)
                    {
                        this.plant_seed(id, tiles[i][1], tiles[i][0]);
                    }
                }
            }
            
            
            
            let mature = 0;
            
            let plant = Game.ObjectsById[2].minigame.plantsById[id];
            
            for (let i = 0; i < tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[tiles[i][0]][tiles[i][1]][0] !== 0 && Game.ObjectsById[2].minigame.plot[tiles[i][0]][tiles[i][1]][1] >= plant.mature)
                {
                    mature++;
                }
            }
            
            if (mature >= tiles.length / 3)
            {
                this.change_soil(4);
            }
            
            else
            {
                this.change_soil(1);
            }
            
            
            
            //If we've reached this point, we know that the targeted plant is not here yet. Therefore, any unlocked plants not in the setup should be cleared.
            for (let i = 0; i < empty_tiles.length; i++)
            {
                let id = Game.ObjectsById[2].minigame.plot[empty_tiles[i][0]][empty_tiles[i][1]][0] - 1;
                
                if (id === -1)
                {
                    continue;
                }
                
                let plant = Game.ObjectsById[2].minigame.plantsById[id];
                
                if (Game.ObjectsById[2].minigame.plants[plant.key].unlocked)
                {
                    Game.ObjectsById[2].minigame.harvest(empty_tiles[i][1], empty_tiles[i][0], true);
                }
            }
        },
        
        
        
        ticks_until_fast_plants: -1,
        
        unlock_type_1_logic: function(fast_parent, slow_parent, child)
        {
            let fast_id = this.mutation_setups[fast_parent].id;
            let slow_id = this.mutation_setups[slow_parent].id;
            
            let fast_plant = Game.ObjectsById[2].minigame.plantsById[fast_id];
            let slow_plant = Game.ObjectsById[2].minigame.plantsById[slow_id];
            
            let fast_tiles = [];
            let slow_tiles = [];
            
            let empty_tiles = [];
            
            
            
            if (typeof this.mutation_setups[this.seed_to_unlock].fast_tiles !== "undefined")
            {
                fast_tiles = this.mutation_setups[this.seed_to_unlock].fast_tiles;
                slow_tiles = this.mutation_setups[this.seed_to_unlock].slow_tiles;
                
                empty_tiles = this.mutation_setups[this.seed_to_unlock].empty_tiles;
            }
            
            else
            {
                fast_tiles = [[0, 1], [2, 1], [5, 1], [1, 4], [4, 4]];
                slow_tiles = [[1, 1], [4, 1], [0, 4], [3, 4], [5, 4]];
                
                empty_tiles = [[0, 0], [0, 2], [0, 3], [0, 5], [1, 0], [1, 2], [1, 3], [1, 5], [2, 0], [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 1], [3, 2], [3, 3], [3, 5], [4, 0], [4, 2], [4, 3], [4, 5], [5, 0], [5, 2], [5, 3], [5, 5]];
            }
            
            
            
            //If more than half the slow plants are missing, we should replant everything.
            let intact = 0;
            
            for (let i = 0; i < slow_tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[slow_tiles[i][0]][slow_tiles[i][1]][0] - 1 === slow_id)
                {
                    intact++;
                }
            }
            
            if (intact <= slow_tiles.length / 2)
            {
                //We start with the slow ones.
                this.remove_unlocked_plants(true);
                
                for (let i = 0; i < slow_tiles.length; i++)
                {
                    if (Game.ObjectsById[2].minigame.plot[slow_tiles[i][0]][slow_tiles[i][1]][0] === 0)
                    {
                        this.plant_seed(slow_id, slow_tiles[i][1], slow_tiles[i][0]);
                    }
                }
                
                this.ticks_until_fast_plants = -1;
            }
            
            //In the unique case where the slow plant is immortal, we should always try to fill gaps.
            if (Game.ObjectsById[2].minigame.plants[slow_parent].immortal)
            {
                for (let i = 0; i < slow_tiles.length; i++)
                {
                    if (Game.ObjectsById[2].minigame.plot[slow_tiles[i][0]][slow_tiles[i][1]][0] === 0)
                    {
                        this.plant_seed(slow_id, slow_tiles[i][1], slow_tiles[i][0]);
                    }
                }
            }
            
            
            
            let mature = 0;
            
            for (let i = 0; i < slow_tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[slow_tiles[i][0]][slow_tiles[i][1]][0] !== 0 && Game.ObjectsById[2].minigame.plot[slow_tiles[i][0]][slow_tiles[i][1]][1] >= slow_plant.mature)
                {
                    mature++;
                }
            }
            
            //At this point, the slow plants are guaranteed to be intact, so we can test if it's the right time to plant the fast ones.
            if (this.ticks_until_fast_plants === -1)
            {
                if (mature === 0)
                {
                    let fast_ticks = Game.ObjectsById[2].minigame.plants[fast_plant.key].mature / (Game.ObjectsById[2].minigame.plants[fast_plant.key].ageTick + Game.ObjectsById[2].minigame.plants[fast_plant.key].ageTickR / 2);
                    
                    let slow_ticks = Game.ObjectsById[2].minigame.plants[slow_plant.key].mature / (Game.ObjectsById[2].minigame.plants[slow_plant.key].ageTick + Game.ObjectsById[2].minigame.plants[slow_plant.key].ageTickR / 2);
                    
                    this.ticks_until_fast_plants = Math.max(Math.floor(slow_ticks - fast_ticks), 0);
                }
                
                else
                {
                    this.ticks_until_fast_plants = 0;
                }
            }
            
            
            
            intact = 0;
            
            for (let i = 0; i < fast_tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[fast_tiles[i][0]][fast_tiles[i][1]][0] - 1 === fast_id)
                {
                    intact++;
                }
            }
            
            //Testing if this is zero and not just low is important for everdaisies and isn't a big inefficiency.
            if (intact === 0 && this.ticks_until_fast_plants === 0)
            {
                for (let i = 0; i < fast_tiles.length; i++)
                {
                    if (Game.ObjectsById[2].minigame.plot[fast_tiles[i][0]][fast_tiles[i][1]][0] === 0)
                    {
                        this.plant_seed(fast_id, fast_tiles[i][1], fast_tiles[i][0]);
                    }
                }
            }
            
            
            
            mature = 0;
            
            for (let i = 0; i < fast_tiles.length; i++)
            {
                if (Game.ObjectsById[2].minigame.plot[fast_tiles[i][0]][fast_tiles[i][1]][0] !== 0 && Game.ObjectsById[2].minigame.plot[fast_tiles[i][0]][fast_tiles[i][1]][1] >= fast_plant.mature)
                {
                    mature++;
                }
            }
            
            if (mature >= fast_tiles.length / 3)
            {
                this.change_soil(4);
            }
            
            else
            {
                this.change_soil(1);
            }
            
            
            
            //If we've reached this point, we know that the targeted plant is not here yet. Therefore, any unlocked plants not in the setup should be cleared.
            for (let i = 0; i < empty_tiles.length; i++)
            {
                let id = Game.ObjectsById[2].minigame.plot[empty_tiles[i][0]][empty_tiles[i][1]][0] - 1;
                
                if (id === -1)
                {
                    continue;
                }
                
                let plant = Game.ObjectsById[2].minigame.plantsById[id];
                
                if (Game.ObjectsById[2].minigame.plants[plant.key].unlocked)
                {
                    Game.ObjectsById[2].minigame.harvest(empty_tiles[i][1], empty_tiles[i][0], true);
                }
            }
        },
        
        
        
        //Apply fertilizer and wait.
        unlock_meddleweed_logic: function()
        {
            this.change_soil(1);
            
            //Remove any non-weed.
            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 6; j++)
                {
                    let tile = Game.ObjectsById[2].minigame.plot[i][j];
                    
                    if (tile[0] === 0)
                    {
                        continue;
                    }
                    
                    let plant = Game.ObjectsById[2].minigame.plantsById[tile[0] - 1];
                    
                    if (plant.key !== "meddleweed")
                    {
                        Game.ObjectsById[2].minigame.harvest(j, i, true);
                    }
                }
            }
        },
        
        
        
        //Grow a full plot of meddleweed and harvest when very old.
        unlock_crumbspore_brownMold_logic: function()
        {
            this.change_soil(1);
            
            //Remove any non-weed.
            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 6; j++)
                {
                    let tile = Game.ObjectsById[2].minigame.plot[i][j];
                    
                    if (tile[0] === 0)
                    {
                        //Plant meddleweed.
                        this.plant_seed(this.mutation_setups.meddleweed.id, j, i);
                        
                        continue;
                    }
                    
                    let plant = Game.ObjectsById[2].minigame.plantsById[tile[0] - 1];
                    
                    if ((plant.key === "meddleweed" && tile[1] > 85) || (plant.key !== "meddleweed" && Game.ObjectsById[2].minigame.plants[plant.key].unlocked))
                    {
                        Game.ObjectsById[2].minigame.harvest(j, i, true);
                    }
                }
            }
        },
        
        
        
        change_soil: function(id)
        {
            if (!this.do_soil_rotation)
            {
                return;
            }
            
            //Shriekbulbs mutate from Duketaters at any age.
            if (this.seed_to_unlock === "shriekbulb" && Game.ObjectsById[2].minigame.soil === 1)
            {
                return;
            }
            
            if (Game.ObjectsById[2].minigame.soil !== id && Game.ObjectsById[2].minigame.nextSoil <= Date.now())
            {
                Game.ObjectsById[2].minigame.soil = id;
                
                Game.ObjectsById[2].minigame.nextSoil = Date.now() + 600000;
                
                Game.Notify('Auto Sacrifice', `Switching to ${id === 1 ? "fertilizer" : "wood chips"}`, [16, 5], 5);
                
                try
                {
                    if (id === 1)
                    {
                        l("gardenSoil-1").classList.add("on");
                        l("gardenSoil-4").classList.remove("on");
                    }
                    
                    else
                    {
                        l("gardenSoil-4").classList.add("on");
                        l("gardenSoil-1").classList.remove("on");
                    }
                }
                
                catch(ex) {}
            }
        },
        
        
        
        plant_seed: function(id, x, y)
        {
            if (this.avoid_cps_buffs)
            {
                for (let key in Game.buffs)
                {
                    if (typeof Game.buffs[key].multCpS !== "undefined" && Game.buffs[key].multCpS > 1)
                    {
                        Game.Notify('Auto Sacrifice', `Skipping planting due to active buff`, [16, 5], 5);
                        
                        return;
                    }
                }
            }
            
            Game.ObjectsById[2].minigame.useTool(id, x, y);
        }
    });
}();