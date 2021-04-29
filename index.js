/*
  Welcome to the code for Baldera Reborn! This has been a project of mine for quite some time.
  If you're reading this, I'm sure you're interested in either my messy codebase, or just to see how this works.
  In either case, I've left comments to help even the most amateur coder understand what's going on.

  As always, you can read this and decide for yourself if this is safe enough for you to use.
  Thank you for your interest!
*/

module.exports = function balderareborn(d) {
  let currentVersion = 105,
      errorPresent = false,
      tempSpawned = false,
      infakeShuttle = false,
      paeButton = [ { id: 1, index: 1, type: 1, text: `Send your platform off. Let me test it.` } ],
      zolButton = [ { id: 1, index: 1, type: 1, text: `Tell Paesyn to send the platform across for me.` } ]

  // Toolbox doesn't support a required definition, so we need to add it ourselves. Doing it in the code allows me to not have to tell people to add it to a definition folder.
  d.dispatch.addDefinition('S_DIALOG_EVENT', 0, [['gameId', 'uint64'], ['target', 'uint64'], ['unk', 'int32'], ['unk1', 'int32'], ['unk2', 'int32']])

  // Toolbox doesn't map the opcodes we need by defualt, so we have to add them ourselves as well. Similar to the definition above, doing this in code makes it easier to update.
  if (d.publisher == 'gf' && d.majorPatchVersion == currentVersion) {
    d.dispatch.addOpcode(`S_DIALOG_EVENT`, 40042) // Talk to an NPC logging server packets.
    d.dispatch.addOpcode(`C_DIALOG_EVENT`, 48938) // Talk to an NPC logging client packets.
  }
  // I play on the Gameforge region. If you are not playing a Gameforge release (NA/EU/RU/SEA), my opcodes will not work and you will need to map them yourself.
  if (d.publisher !== 'gf') {
    d.error(`Baldera Reborn is designed for the Gameforge publisher's regions (NA/EU/RU/SEA). It will not function for your safety.`)
    d.error(`If you want to use Baldera Reborn, you'll have to disable updates and supply your own opcodes in the index.js file.`)
    errorPresent = true // this disables the spawning of our NPCs.
  }
  // If our opcodes are outdated, we will disable the mod (and not push the opcodes to the client) out of safety.
  // This means that the mod will not function if it is out of date, which again, is for your safety. There is no harm in leaving this mod in, but you'll have to wait for an update to resume use.
  if (d.majorPatchVersion !== currentVersion) {
    d.error(`Baldera Reborn is outdated, and will not spawn NPCs in Baldera for your safety. Usually this is caused when the game has a major patch update.`)
    d.error(`If this has not been fixed in >24 hours, you can create an issue on Github: https://github.com/ambushing/Baldera-Reborn or tag Ambush#0001 in the TERA Toolbox Discord.`)
    errorPresent = true
  }

  /*
    If your zone is one AND no errors were present from the above opcode push, then load the NPCs. If there's an error with the opcodes, the NPCs will not spawn, which is the safest possible solution.
    Additionally, this spawning method based on zone is NOT optimal. I would generally also like to check the player's current location, much like how I accomplish that with my Baldera Minimap mod.
    However, the annoyance created from this method is minimal at worst, unlike a minimap in your face every time you enter zone one (which also includes Velika Wilds, if you want to explore more... ;))
  */
  d.hook('S_LOAD_TOPO', 3, (e) => { if (e.zone == 1 && !errorPresent) { loadNPCS(); } tempSpawned = false; infakeShuttle = false; })

  // When you talk to an NPC, we need to do a few things:
  d.hook('C_NPC_CONTACT', 2, (e) => {
    if (e.gameId > 999999n) return; // First, any gameId higher than 999,999 is totally ignored by my mod. We don't want anything to do with even remotely "real" gameIds. Although, this number could be realistically bumped higher.
    if (e.gameId <= 69999n && e.gameId >= 66600n) { return false } // Second, if the GameId is higher than 66,600 (what I use for pure decoration) but lower than 69,999; don't send the server C_NPC_CONTACT at all.
    d.send('S_DIALOG_EVENT', 0, { gameId: e.gameId, target: d.game.me.gameId, unk1: 1 }) // Third, we're going to be sending S_DIALOG_EVENT with the gameId of the NPC and your gameid as the target. Scroll down for more on how this works.
    // Below this is a lot of if spam. Within it, includes an sDialog function, which is how we show you the spliced dialog!
    // This is extremely safe, as we return false on this packet at the very bottom. The server sees ZERO invalid data.
    // Merchant area one
    if (e.gameId == 11100n) { sDialog(e.gameId, 1002, 80, 1, Number(e.gameId)); }
    if (e.gameId == 11101n) { sDialog(e.gameId, 1001, 60, 101, Number(e.gameId)); }
    if (e.gameId == 11102n) { sDialog(e.gameId, 2000, 3035, 101, Number(e.gameId)); }
    if (e.gameId == 11103n) { sDialog(e.gameId, 1961, 63, 1, Number(e.gameId)); }
    if (e.gameId == 11104n) { sDialog(e.gameId, 1005, 76, 1, Number(e.gameId)); }
    if (e.gameId == 11105n) { sDialog(e.gameId, 2107, 183, 1, Number(e.gameId)); }
    if (e.gameId == 11106n) { sDialog(e.gameId, 3602, 71, 1, Number(e.gameId)); }
    if (e.gameId == 11107n) { sDialog(e.gameId, 3601, 71, 1, Number(e.gameId)); }
    // Merchant area two
    if (e.gameId == 11108n) { sDialog(e.gameId, 1002, 75, 1, Number(e.gameId)); }
    if (e.gameId == 11109n) { sDialog(e.gameId, 1001, 375, 1, Number(e.gameId)); }
    if (e.gameId == 11110n) { sDialog(e.gameId, 1600, 75, 1, Number(e.gameId)); } 
    if (e.gameId == 11111n) { sDialog(e.gameId, 11111, 979, 1, Number(e.gameId)); }
    if (e.gameId == 11112n) { sDialog(e.gameId, 1003, 58, 1, Number(e.gameId)); }
    if (e.gameId == 11113n) { sDialog(e.gameId, 1401, 373, 1, Number(e.gameId)); }
    if (e.gameId == 11114n) { sDialog(e.gameId, 2057, 183, 1, Number(e.gameId)); }
    if (e.gameId == 11115n) { sDialog(e.gameId, 2058, 183, 1, Number(e.gameId)); }
    // Merchant area three
    if (e.gameId == 11116n) { sDialog(e.gameId, 1005, 62, 1, Number(e.gameId)); }
    if (e.gameId == 11117n) { sDialog(e.gameId, 1001, 378, 1, Number(e.gameId)); }
    if (e.gameId == 11118n) { sDialog(e.gameId, 1401, 380, 1, Number(e.gameId)); }
    // Camp merchants
    if (e.gameId == 11119n) { sDialog(e.gameId, 1033, 216, 1, Number(e.gameId)); }
    if (e.gameId == 11120n) { sDialog(e.gameId, 1058, 252, 1, Number(e.gameId)); }
    // Interesting NPCs
    if (e.gameId == 44400n) { sDialog(e.gameId, 1006, 62, 1, Number(e.gameId)); }
    if (e.gameId == 44401n) { sDialog(e.gameId, 1100, 183, 1, Number(e.gameId)); }
    if (e.gameId == 44402n) { sDialog(e.gameId, 1005, 58, 1, Number(e.gameId)); }
    if (e.gameId == 44403n) { sDialog(e.gameId, 1005, 58, 1, Number(e.gameId)); }
    if (e.gameId == 44404n) { sDialog(e.gameId, 1005, 58, 1, Number(e.gameId)); }
    if (e.gameId == 44405n) { sDialog(e.gameId, 1005, 58, 1, Number(e.gameId)); }
    if (e.gameId == 44407n) { sDialog(e.gameId, 1005, 58, 1, Number(e.gameId)); }
    if (e.gameId == 44408n) { sDialog(e.gameId, 2000, 237, 1, Number(e.gameId)); }
    // Balderon City
    if (e.gameId == 55501n) { sDialog(e.gameId, 1114, 71, 1, Number(e.gameId)); }
    if (e.gameId == 55502n) { sDialog(e.gameId, 7000, 451, 1, Number(e.gameId)); }
    if (e.gameId == 55504n) { sDialog(e.gameId, 1605, 63, 1, Number(e.gameId)); }
    if (e.gameId == 55505n) { sDialog(e.gameId, 1009, 228, 1, Number(e.gameId)); }
    if (e.gameId == 55506n) { sDialog(e.gameId, 1042, 70, 1, Number(e.gameId)); }
    if (e.gameId == 55507n) { sDialog(e.gameId, 1201, 383, 1, Number(e.gameId)); }
    if (e.gameId == 55508n) { sDialog(e.gameId, 1301, 376, 1, Number(e.gameId)); }
    if (e.gameId == 55509n) { sDialog(e.gameId, 1001, 58, 1, Number(e.gameId)); }
    if (e.gameId == 55510n) { sDialog(e.gameId, 220080, 63, 6, Number(e.gameId)); }
    if (e.gameId == 55511n) { sDialog(e.gameId, 1008, 74, 1, Number(e.gameId)); }
    if (e.gameId == 55512n) { sDialog(e.gameId, 1009, 74, 1, Number(e.gameId)); }
    if (e.gameId == 55513n) { sDialog(e.gameId, 45321, 0, 1, Number(e.gameId)); }
    if (e.gameId == 55514n) { sDialog(e.gameId, 1008, 254, 1, Number(e.gameId)); }
    if (e.gameId == 55515n) { sDialog(e.gameId, 1009, 236, 1, Number(e.gameId)); }
    if (e.gameId == 55516n) { sDialog(e.gameId, 9906, 223, 1, Number(e.gameId)); }
    if (e.gameId == 55517n) { sDialog(e.gameId, 1080, 72, 1, Number(e.gameId)); }
    if (e.gameId == 55518n) { sDialog(e.gameId, 2023, 506, 1, Number(e.gameId)); }
    if (e.gameId == 55519n) { sDialog(e.gameId, 135, 599, 1, Number(e.gameId)); }
    if (e.gameId == 55520n) { sDialog(e.gameId, 7836, 18, 1, Number(e.gameId)); }
    if (e.gameId == 55522n) { sDialog(e.gameId, 2207, 183, 1, Number(e.gameId)); }
    if (e.gameId == 55523n) { sDialog(e.gameId, 2200, 183, 1, Number(e.gameId)); }
    if (e.gameId == 55524n) { sDialog(e.gameId, 2202, 183, 1, Number(e.gameId)); }
    if (e.gameId == 55525n) { sDialog(e.gameId, 1011, 71, 1, Number(e.gameId)); }
    if (e.gameId == 55526n) { sDialog(e.gameId, 3005, 77, 1, Number(e.gameId)); }
    if (e.gameId == 55527n) { sDialog(e.gameId, 1010, 66, 1, Number(e.gameId)); }
    if (e.gameId == 55528n) { sDialog(e.gameId, 5038, 528, 106, Number(e.gameId)); }
    if (e.gameId == 55529n) { sDialog(e.gameId, 1083, 84, 1, Number(e.gameId)); }
    if (e.gameId == 55530n) { sDialog(e.gameId, 1100, 65, 1, Number(e.gameId)); }
    if (e.gameId == 55531n) { sDialog(e.gameId, 2060, 182, 1, Number(e.gameId)); }
    if (e.gameId == 55532n) { sDialog(e.gameId, 1008, 58, 1, Number(e.gameId)); }
    if (e.gameId == 55533n) { sDialog(e.gameId, 1015, 222, 1, Number(e.gameId)); }
    if (e.gameId == 55534n) { sDialog(e.gameId, 1041, 70, 101, Number(e.gameId)); }
    if (e.gameId == 55535n) { sDialog(e.gameId, 1224, 84, 1, Number(e.gameId)); }
    if (e.gameId == 55536n) { sDialog(e.gameId, 1005, 29, 1, Number(e.gameId)); }
    if (e.gameId == 55537n) { sDialog(e.gameId, 1001, 503, 1, Number(e.gameId)); }
    if (e.gameId == 55538n) { sDialog(e.gameId, 5007, 32, 1, Number(e.gameId)); }
    if (e.gameId == 55539n) { sDialog(e.gameId, 220020, 123, 3, Number(e.gameId)); }
    if (e.gameId == 55540n) { sDialog(e.gameId, 3001, 71, 1, Number(e.gameId)); }
    if (e.gameId == 55541n) { sDialog(e.gameId, 3001, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55542n) { sDialog(e.gameId, 3003, 71, 1, Number(e.gameId)); }
    if (e.gameId == 55543n) { sDialog(e.gameId, 3002, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55544n) { sDialog(e.gameId, 22005, 84, 6, Number(e.gameId)); }
    if (e.gameId == 55545n) { sDialog(e.gameId, 1034, 76, 1, Number(e.gameId)); }
    if (e.gameId == 55546n) { sDialog(e.gameId, 1158, 63, 1, Number(e.gameId)); }
    if (e.gameId == 55547n) { sDialog(e.gameId, 5007, 18, 1, Number(e.gameId)); }
    if (e.gameId == 55548n) { sDialog(e.gameId, 1050, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55549n) { sDialog(e.gameId, 1106, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55550n) { sDialog(e.gameId, 1052, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55551n) { sDialog(e.gameId, 20302, 2001, 102, Number(e.gameId)); }
    if (e.gameId == 55552n) { sDialog(e.gameId, 1115, 63, 1, Number(e.gameId)); }
    if (e.gameId == 55553n) { sDialog(e.gameId, 1108, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55554n) { sDialog(e.gameId, 1023, 61, 1, Number(e.gameId)); }
    if (e.gameId == 55555n) { sDialog(e.gameId, 1534, 63, 1, Number(e.gameId)); }
    if (e.gameId == 55556n) { sDialog(e.gameId, 1044, 230, 1, Number(e.gameId)); }
    if (e.gameId == 55557n) { sDialog(e.gameId, 1019, 61, 1, Number(e.gameId)); }
    if (e.gameId == 55558n) { sDialog(e.gameId, 1002, 234, 1, Number(e.gameId)); }
    if (e.gameId == 55559n) { sDialog(e.gameId, 1016, 207, 1, Number(e.gameId)); }
    if (e.gameId == 55560n) { sDialog(e.gameId, 1009, 58, 1, Number(e.gameId)); }
    if (e.gameId == 55561n) { sDialog(e.gameId, 1050, 415, 101, Number(e.gameId)); }
    if (e.gameId == 55562n) { sDialog(e.gameId, 1002, 207, 1, Number(e.gameId)); }
    if (e.gameId == 55563n) { sDialog(e.gameId, 1019, 172, 1, Number(e.gameId)); }
    if (e.gameId == 55564n) { sDialog(e.gameId, 1050, 415, 1, Number(e.gameId)); }
    if (e.gameId == 55565n) { sDialog(e.gameId, 1050, 415, 2, Number(e.gameId)); }
    if (e.gameId == 55566n) { sDialog(e.gameId, 1018, 76, 1, Number(e.gameId), paeButton); } // Shuttle NPC
    if (e.gameId == 55568n) { sDialog(e.gameId, 1011, 79, 1, Number(e.gameId), zolButton); } // Shuttle NPC
    return false // For all other instances (like the if spam above), we will block the C_CONTACT_NPC packet from being sent to the server. This prevents us from sending invalid information, which risks a ban.
  })

  function loadNPCS() {
    /*
      Welcome to a massive part of my code's bloat! The load NPCs function!
      This function, if you cant tell from its name, will load all of the NPCs under the following two conditions:
        1. If you are in zone 1 (Baldera and/or Velika Wilds)
        and 2. If there are no errors from the initialization of the mod.
      It loads all of them at once, and leaves the client to handle loading, unloading, and the likes.
      The NPCs will all unload when you leave zone one, so it works flawlessly as-is! There should be no performance impact as long as you aren't running a toaster.
      I've left comments of the names (and/or a decent way to find the NPCs) by their name. Although this isn't foolproof, as even my own naming scheme got lost in the process of making this mod.
    */
    d.hookOnce('S_SPAWN_ME', 3, (e) => {
      spawnNpc(11100, { x: 132800.234375, y: 31614.833984375, z: 3485.75537109375 }, -1.5707878276318836, 1002, 81, 7406) // Merchant
      spawnNpc(11101, { x: 132725.234375, y: 31614.833984375, z: 3485.75537109375 }, -1.5707878276318836, 2110, 183, 7407) // Specialty Store
      spawnNpc(11102, { x: 132650.234375, y: 31614.833984375, z: 3485.75537109375 }, -1.5707878276318836, 2069, 183, 7406) // Magic Materials
      spawnNpc(11103, { x: 132575.234375, y: 31614.833984375, z: 3485.75537109375 }, -1.5707878276318836, 1003, 70) // Crystal Merchant
      spawnNpc(11104, { x: 132500.234375, y: 31614.833984375, z: 3485.75537109375 }, -1.5707878276318836, 1005, 76, 7404) // Banker
      spawnNpc(11105, { x: 132347.9375, y: 31717.576171875, z: 3490.26220703125 }, -3.1110089116313233, 2107, 183, 7405) // Broker
      spawnNpc(11106, { x: 131859.71875, y: 32229.990234375, z: 3491.43994140625 }, -0.40545029699802354, 3602, 71, 7408) // Vanguard Crystals
      spawnNpc(11107, { x: 131824.296875, y: 32150.25390625, z: 3492.5615234375 }, -0.40545029699802354, 3601, 71, 7408) // Vanguard Shop
      spawnNpc(11108, { x: 132521.75, y: 33129.8359375, z: 3593.7548828125 }, 1.5709346752569826, 1002, 75, 7406) // Merchant
      spawnNpc(11109, { x: 132583.84375, y: 33129.8359375, z: 3593.7548828125 }, 1.5709346752569826, 2014, 183, 7407) // Specialty Store
      spawnNpc(11110, { x: 132645.938, y: 33129.8359375, z: 3593.7548828125 }, 1.5709346752569826, 2005, 183, 7406) // Development Merchant
      spawnNpc(11111, { x: 132921.203125, y: 33591.8203125, z: 3591.74951171875 }, 2.403556147018314, 1003, 75) // Crystal Merchant
      spawnNpc(11112, { x: 132802.265625, y: 34435.44921875, z: 3630.755615234375 }, 3.135264982839765, 2020, 183, 7404) // Banker
      spawnNpc(11113, { x: 132802.265625, y: 34335.44921875, z: 3630.755615234375 }, 3.135264982839765, 2004, 183, 7405) // Broker
      spawnNpc(11114, { x: 132023.453125, y: 34910.97265625, z: 3625.749267578125 }, 0.006519418348513975, 2059, 183, 7408) // Vanguard Crystals
      spawnNpc(11115, { x: 132020.75, y: 34590.53515625, z: 3625.74951171875 }, 0.006519418348513975, 2058, 183, 7408) // Vanguard Shop
      spawnNpc(11116, { x: 135322.390625, y: 35577.22265625, z: 3758.75537109375 }, -1.5902587080411956, 1005, 62, 7404) // Banker
      spawnNpc(11117, { x: 135022.391, y: 35577.40234375, z: 3758.75537109375 }, -1.5902587080411956, 1003, 77, 7406) // Merchant
      spawnNpc(11118, { x: 134753.75, y: 35577.40234375, z: 3758.75537109375 }, -1.5902587080411956, 1402, 378, 7405) // Broker
      spawnNpc(11119, { x: 136823.640625, y: 8128.50439453125, z: 2488.249755859375 }, 2.6575258412126304, 1033, 216, 7406) // Traveling Merchant @ Lokian Watch
      spawnNpc(11120, { x: 135700.171875, y: 19779.521484375, z: 2042.749755859375 }, -1.227184630308513, 1033, 224, 7406) // Traveling Merchant @ Ruinwatch
      spawnNpc(44400, { x: 135235.015625, y: 31706.140625, z: 3796.109375 }, 1.630333956124708, 6014, 152, 7410) // Mirr
      spawnNpc(44401, { x: 133761, y: 36660, z: 4014.2 }, -1.6, 1100, 183) // Oriyn's Will
      spawnNpc(44402, { x: 134717.140625, y: 31947.12109375, z: 3751.74951171875 }, 2.574115635871349, 1005, 58) // Balderon Teleportal A
      spawnNpc(44403, { x: 131839.71875, y: 31389.390625, z: 3490.825439453125 }, -0.24476580946700263, 1005, 58) // Balderon Teleportal B
      spawnNpc(44404, { x: 136184.75, y: 34545.65234375, z: 3603.249267578125 }, 2.0226495426264606, 1005, 58) // Balderon Teleportal C
      spawnNpc(44405, { x: 135804.578125, y: 19406.109375, z: 2035.525390625 }, 0.7456105367116644, 1005, 58) // Balderon Teleportal D aka Ruinwatch Outpost
      spawnNpc(44407, { x: 136923.265625, y: 8573.501953125, z: 2488.249755859375 }, -2.914084127986504, 1005, 58) // Balderon Teleportal F aka Lokian Watch
      spawnNpc(44408, { x: 132842.4375, y: 31210.419921875, z: 3477.531005859375 }, 2.7018195364628284, 1511, 246) // Krora (Oriyn's Will 2 on stump)
      spawnNpc(55501, { x: 133586, y: 36370, z: 4014.18 }, 1.0, 3405, 181) // Researcher #1
      spawnNpc(55502, { x: 133760.765625, y: 36616.1796875, z: 4013.8916015625 }, 1.576452880950225, 3405, 181) // Researcher #2
      spawnNpc(55504, { x: 133043, y: 36671, z: 4013.7 }, -0.3, 1039, 70) // Drillmaster
      spawnNpc(55505, { x: 133107, y: 36663, z: 4013.7}, 2.9, 1017, 75) // Lanain
      spawnNpc(55506, { x: 133799, y: 36227, z: 4013.7 }, -1.9, 1010, 71) // Circle Magician #1
      spawnNpc(55507, { x: 132533, y: 35645, z: 3759.5 }, -1.5, 1201, 383) // Tactics Instructor
      spawnNpc(55508, { x: 132339, y: 35645, z: 3755.9 }, -1.5, 1301, 376) // Magic Instructor
      spawnNpc(55509, { x: 131198.6875, y: 31280.06640625, z: 3489.501220703125 }, 0.04026699568199808, 1093, 230) // Gate NPC 1
      spawnNpc(55510, { x: 132435, y: 35712, z: 3764.2 }, -1.5, 1139, 63) // Door Blocker
      spawnNpc(55511, { x: 130725.6875, y: 30367.4765625, z: 3596.374267578125 }, -2.3913801745144716, 1008, 74) // S. Gate Guard L
      spawnNpc(55512, { x: 130543.2265625, y: 30628.908203125, z: 3580.982177734375 }, -2.5397928157424077, 1009, 74) // S. Gate Guard R
      spawnNpc(55513, { x: 134462.09375, y: 34009.13671875, z: 3599.92333984375 }, 2.3750816286431866, 2064, 183) // Scholar/Teacher
      spawnNpc(55514, { x: 134318.78125, y: 34063.15234375, z: 3599.92529296875 }, -0.368, 5201, 618) // Sharkas
      spawnNpc(55515, { x: 134353.6875, y: 34187.2421875, z: 3621.309814453125 }, -1.105, 5202, 618) // Jackam
      spawnNpc(55516, { x: 134270.71875, y: 34187.17578125, z: 3642.562744140625 }, -0.69, 5203, 618) // Harril
      spawnNpc(55517, { x: 134277.484375, y: 34129.27734375, z: 3621.896240234375 }, -0.56, 5204, 618) // Ronka
      spawnNpc(55518, { x: 134365.84375, y: 34104.91015625, z: 3599.494873046875 }, -0.72, 5205, 618) // Docan
      spawnNpc(55519, { x: 131645.796875, y: 30315.6171875, z: 3505.3388671875 }, -0.03499393672364119, 1006, 83) // "Husband" near south gate
      spawnNpc(55520, { x: 131692.03125, y: 30316.76953125, z: 3501.37890625 }, -3.115131484998766, 1027, 74) // "Wife" near south gate
      spawnNpc(55522, { x: 133650.359375, y: 36534.41015625, z: 4013.74951171875 }, -0.4999673534926571, 2207, 183) // Book #1
      spawnNpc(55523, { x: 133977.4375, y: 36304.1640625, z: 4013.74951171875 }, 1.294448136090243, 2207, 183) // Book #2
      spawnNpc(55524, { x: 133528.1875, y: 36135.7734375, z: 4013.749267578125 }, -2.7300354525578651, 2207, 183) // Book #3
      spawnNpc(55525, { x: 133985.796875, y: 36327.875, z: 4013.74951171875 }, -1.895712632428924, 1011, 71) // Circle Magician #2
      spawnNpc(55526, { x: 133615.625, y: 31321.2421875, z: 3769.302490234375 }, 0.006040049352299712, 1007, 203) // Bot Main Guard L
      spawnNpc(55527, { x: 133865.484375, y: 33838.140625, z: 3766.940185546875 }, 1.5728096765789965, 1010, 66) // Conversation A Main Participant 1
      spawnNpc(55528, { x: 133865.484375, y: 33902.4765625, z: 3766.94384765625 }, -1.5618800634653112, 1018, 183) // Conversation A Main Participant 2
      spawnNpc(55529, { x: 133558.5, y: 32085.44140625, z: 3771.1181640625 }, 0.68731926677201, 1083, 84) // Conversation B Main Participant 1
      spawnNpc(55530, { x: 133573.125, y: 32105.216796875, z: 3771.1181640625 }, -2.3357733709536173, 1100, 65) // Conversation B Main Participant 2
      spawnNpc(55531, { x: 133545.578125, y: 31968.484375, z: 3771.117919921875 }, 1.3131834282293517, 1132, 63) // Conversation B Main Participant 3
      spawnNpc(55532, { x: 132092.15625, y: 30999.154296875, z: 3490.18212890625 }, -2.966622969971587, 1029, 230) // Gate NPC 2
      spawnNpc(55533, { x: 131030.625, y: 35365.65234375, z: 3765.141845703125 }, 1.5011883211548807, 1005, 222) // Secret Conversation Participant 1
      spawnNpc(55534, { x: 131405.578125, y: 34480.58203125, z: 3731.24951171875 }, 2.272304915854849, 1101, 71) // Conversation C Main Participant 1
      spawnNpc(55535, { x: 131353.015625, y: 34533.484375, z: 3731.24951171875 }, -0.8134891865756041, 1001, 172) // Conversation C Main Participant 2
      spawnNpc(55536, { x: 131346.203125, y: 34584.03515625, z: 3731.24951171875 }, -1.0824151934518056, 1002, 172) // Conversation C Main Participant 3
      spawnNpc(55537, { x: 131300.484375, y: 34524.38671875, z: 3731.24951171875 }, -0.45425006081263547, 1200, 172) // Conversation C Main Participant 4
      spawnNpc(55538, { x: 133945.796875, y: 31647.439453125, z: 3491.106689453125 }, -0.8319928298294746, 5007, 32) // Puzzling Monument
      spawnNpc(55539, { x: 131031.296875, y: 35448.88671875, z: 3726.069580078125 }, -1.5534431691319401, 2075, 183) // Secret Converstaion Participant 2
      spawnNpc(55540, { x: 132460.3125, y: 32495.16015625, z: 3610.024658203125 }, -2.3700961910825584, 3012, 71) // Hyderad Legacy Emissary
      spawnNpc(55541, { x: 132413.875, y: 32361.490234375, z: 3496.34228515625 }, 1.2203775905622705, 3001, 230) // Hyderad Legacy 1
      spawnNpc(55542, { x: 132346.0625, y: 32389.21875, z: 3500.24951171875 }, 0.7273945148555224, 1013, 230) // Hyderad Legacy 2
      spawnNpc(55543, { x: 132329.328125, y: 32461.0546875, z: 3497.659423828125 }, 0.26950124967165856, 3002, 230) // Hyderad Legacy 3
      spawnNpc(55544, { x: 133016.53125, y: 32630.173828125, z: 3486.025634765625 }, -1.7490257195873595, 3018, 71) // Hyderad Legacy Ecologist
      spawnNpc(55545, { x: 135015.328125, y: 32250.408203125, z: 3753.359130859375 }, -1.0940159231601907, 1033, 61) // Pegasus Platform NPC 1
      spawnNpc(55546, { x: 133745.828125, y: 33625.4140625, z: 3591.74951171875 }, -1.491125199624086, 1051, 230) // Under bridge NPC 1
      spawnNpc(55547, { x: 131795.078125, y: 31775.556640625, z: 3489.5009765625 }, -3.1173365823813515, 1031, 230) // npc
      spawnNpc(55548, { x: 131919.421875, y: 33463.58984375, z: 3592.3798828125 }, 0.0017257283863713463, 1050, 230) // npc
      spawnNpc(55549, { x: 133254.3125, y: 34263.875, z: 3724.3759765625 }, -2.3792042020106297, 1106, 230) // npc
      spawnNpc(55550, { x: 135404.203125, y: 34334.38671875, z: 3605.749267578125 }, 2.2551435057903784, 1052, 230) // npc
      spawnNpc(55551, { x: 135063.015625, y: 36954.7109375, z: 4073.08935546875 }, -1.8161373790573563, 6010, 13) // marshall
      spawnNpc(55552, { x: 131294.84375, y: 31283.6015625, z: 3489.501220703125 }, -3.103051386294166, 1009, 256) // gate npc 1 convo 2
      spawnNpc(55553, { x: 134696.8125, y: 35499.8515625, z: 3735.658447265625 }, 0.931222212045827, 1108, 230) // area 3 speak npc 1
      spawnNpc(55554, { x: 132407.796875, y: 34139.7265625, z: 3625.749267578125 }, -1.9695354578459203, 1023, 61) // area 2 speak npc 1
      spawnNpc(55555, { x: 132343.5625, y: 34034.96875, z: 3625.74951171875 }, -2.0427830404674596, 1013, 83) // area 2 npc 3
      spawnNpc(55556, { x: 133709.875, y: 33648.25, z: 3766.508544921875 }, 1.5791373473290247, 1044, 230) // area 2 npc 3
      spawnNpc(55557, { x: 131138.640625, y: 33497.37890625, z: 3593.189453125 }, -0.02233859522358465, 1063, 230) // pond npc idk #
      spawnNpc(55558, { x: 136522.6875, y: 8651.26953125, z: 2488.249755859375 }, -1.1613193302286733, 1002, 234) // Lokian Watch NPC 1
      spawnNpc(55559, { x: 136352.921875, y: 8569.4716796875, z: 2488.249755859375 }, 2.8655719855696207, 1016, 207) // Lokian Watch NPC 2
      spawnNpc(55560, { x: 136419.453125, y: 8200.078125, z: 2488.249755859375 }, 1.1693727293650729, 1005, 211) // Lokian Watch NPC 3
      spawnNpc(55561, { x: 136258.671875, y: 19233.244140625, z: 2042.749755859375 }, -0.2931820780846432, 1102, 359) // Ruinwatch Cleric 1
      spawnNpc(55562, { x: 136303.453125, y: 19744.46484375, z: 2061.04638671875 }, -2.3126677853360897, 1002, 207) // Ruinwatch NPC 1
      spawnNpc(55563, { x: 135909.828125, y: 19658.67578125, z: 2042.749755859375 }, 2.086213871524472, 1019, 172) // Ruinwatch NPC 2
      spawnNpc(55564, { x: 136024.90625, y: 19759.25, z: 2042.749755859375 }, 2.3420051679044027, 1102, 375) // Ruinwatch Cleric 2
      spawnNpc(55565, { x: 136061.84375, y: 19789.509765625, z: 2042.749755859375 }, -3.082534393256196, 1102, 377) // Ruinwatch Cleric 3
      // NPCs that are purely for decoration, and cannot be spoken to.
      // Do note that some of these NPCs will say "press F". This is a limitation I couldn't figure out how to negate. Sorry!
      spawnNpc(66600, { x: 131124.84375, y: 31806.48046875, z: 3522.961181640625 }, 0.77, 1010, 183) // Mystel's Arcana
      spawnNpc(66601, { x: 134629.171875, y: 34908.46484375, z: 3632.701416015625 }, 0.019270633647813368, 1139, 63) // L Guard near scholar.
      spawnNpc(66602, { x: 134628.9375, y: 34572.05078125, z: 3627.431884765625 }, -0.022530342822070355, 1700, 74) // R Guard near scholar.
      spawnNpc(66603, { x: 133846.9375, y: 35234.625, z: 3766.508544921875 }, -3.1163778443889227, 1700, 70) // L Main Guard
      spawnNpc(66604, { x: 133643.46875, y: 35234.625, z: 3766.508544921875 }, 0.01601092447355638, 1700, 70) // R Main Guard
      spawnNpc(66605, { x: 133881.140625, y: 33148.77734375, z: 3767.797119140625 }, 3.1071739596616093, 1700, 70) // Mid Main Guard R
      spawnNpc(66606, { x: 133879.796875, y: 32828.453125, z: 3767.7021484375 }, -3.1018050269040094, 1700, 70) // Mid Main Guard L
      spawnNpc(66607, { x: 133872.28125, y: 31320.9921875, z: 3769.324951171875 }, -3.1138851256086086, 1700, 70) // Bot Main Guard R
      spawnNpc(66608, { x: 131734.390625, y: 31910.306640625, z: 3481.378173828125 }, 3.1349773614420364, 2034, 183) // Sitting Arcana Pool A
      spawnNpc(66609, { x: 130605.734375, y: 31573.48046875, z: 3490.81884765625 }, 0.476013413240763, 2035, 183) // Sitting Arcana Pool B
      spawnNpc(66610, { x: 131835.90625, y: 33167.99609375, z: 3668.60205078125 }, -0.30994786639942474, 2034, 183) // Sitting Pillar
      spawnNpc(66611, { x: 135387.90625, y: 35521.5234375, z: 3747.98583984375 }, 2.493389896908867, 1049, 70) // Shopper A
      spawnNpc(66612, { x: 133645.15625, y: 33349.33984375, z: 3766.508544921875 }, -1.1095474786375328, 2030, 183) // No Talk Conversation A #1
      spawnNpc(66613, { x: 133664.03125, y: 33293.4609375, z: 3766.508544921875 }, 1.885358262110696, 2026, 183) // No Talk Conversation A #2
      spawnNpc(66614, { x: 135520.96875, y: 34877.19921875, z: 3617.42578125 }, 2.293588899286762, 2030, 183) // No Talk Conversation B #1
      spawnNpc(66615, { x: 135476.046875, y: 34906.6328125, z: 3619.5234375 }, -0.7298872336358366, 2026, 183) // No Talk Conversation B #2
      spawnNpc(66616, { x: 135512.234375, y: 34932.38671875, z: 3619.9638671875 }, -1.270040218570068, 2029, 183) // No Talk Conversation B #3
      spawnNpc(66617, { x: 134852.375, y: 34979.90625, z: 3600.861328125 }, -1.5795208425259961, 2034, 183) // Sitting Scholar #1
      spawnNpc(66618, { x: 135183.796875, y: 35160.94921875, z: 3665.69873046875 }, -1.5830681730979816, 2035, 183) // Sitting Scholar #2
      spawnNpc(66619, { x: 132001.40625, y: 33504.3046875, z: 3594.453857421875 }, -2.7237746364894417, 2029, 183) // above echo stones no talk
      spawnNpc(66620, { x: 132068.765625, y: 33464.203125, z: 3596.39697265625 }, 3.115898475392709, 2030, 183) // above echo stones no talk #2
      spawnNpc(66621, { x: 131976.34375, y: 33427.78515625, z: 3593.46630859375 }, 2.5481338362765356, 2026, 183) // above echo stones no talk #3
      spawnNpc(66622, { x: 131192.40625, y: 30472.87890625, z: 3544.32275390625 }, 0.42740539702463676, 2030, 183) // gate no talk #1
      spawnNpc(66624, { x: 131271.359375, y: 30510.962890625, z: 3524.258056640625 }, -2.691752787542329, 2026, 183) // gate no talk #2
      spawnNpc(66625, { x: 135063.015625, y: 36819.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist 36819
      spawnNpc(66626, { x: 135108.01625, y: 36819.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66627, { x: 135018.01625, y: 36819.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66628, { x: 135063.015625, y: 36774.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist -45
      spawnNpc(66629, { x: 135108.01625, y: 36774.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66630, { x: 135018.01625, y: 36774.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66631, { x: 135063.015625, y: 36729.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist -45
      spawnNpc(66632, { x: 135108.01625, y: 36729.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66633, { x: 135018.01625, y: 36729.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66634, { x: 135063.015625, y: 36684.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist -45
      spawnNpc(66635, { x: 135108.01625, y: 36684.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66636, { x: 135018.01625, y: 36684.7109, z: 4013.749267578125 }, 1.3012950771232379, 6012, 13) // marshall specialist ^
      spawnNpc(66638, { x: 132988.484375, y: 32545.53515625, z: 3468.69580078125 }, -2.707955459614371, 3016, 230) // flower group 1
      spawnNpc(66639, { x: 132981.453125, y: 32516.189453125, z: 3462.495849609375 }, 2.9957686049414143, 3017, 230) // flower group 1
      spawnNpc(66640, { x: 133590.359375, y: 32855.91796875, z: 3474.60302734375 }, -2.2499663206312643, 3016, 230) // flower group 2
      spawnNpc(66641, { x: 133819.75, y: 32548.66015625, z: 3461.20751953125 }, 1.9322405499404507, 3016, 230) // flower group 3
      spawnNpc(66642, { x: 133902.578125, y: 31712.396484375, z: 3485.94970703125 }, -0.1785170141901915, 3016, 230) // flower group 4
      spawnNpc(66643, { x: 133892.15625, y: 31762.111328125, z: 3479.229248046875 }, -1.0778132510881486, 3017, 230) // flower group 4
      spawnNpc(66644, { x: 133860.203125, y: 31683.171875, z: 3489.36474609375 }, -2.2814129267829197, 3017, 230) // flower group 4
      spawnNpc(66645, { x: 133903.015625, y: 32555.72265625, z: 3461.5888671875 }, -0.0371990341062268, 3017, 230) // flower group 3
      spawnNpc(66647, { x: 133846.4375, y: 32602.42578125, z: 3461.749267578125 }, 0.7307500978290223, 3017, 230) // flower group 3
      spawnNpc(66648, { x: 133903.1875, y: 32630.5546875, z: 3461.749267578125 }, 0.7048641720334521, 3017, 230) // flower group 3
      spawnNpc(66649, { x: 132282.796875, y: 30710.69921875, z: 3461.006103515625 }, -0.8966117705191573, 3016, 230) // flower group 5
      spawnNpc(66650, { x: 133049.46875, y: 30924.15625, z: 3461.847412109375 }, -2.9285610716721746, 3016, 230) // flower group 6
      spawnNpc(66651, { x: 133069.4375, y: 30880.220703125, z: 3461.006103515625 }, 0.5650801727373731, 3017, 230) // flower group 6
      spawnNpc(66652, { x: 136185.109375, y: 33534.953125, z: 3468.889404296875 }, 0.2525315872056737, 3017, 230) // flower group 7
      spawnNpc(66653, { x: 136370.78125, y: 33528.05078125, z: 3467.447021484375 }, -2.0865973667214432, 3016, 230) // flower group 8
      spawnNpc(66654, { x: 132408.671875, y: 34087.125, z: 3625.74951171875 }, 1.5879577368593671, 1049, 70) // area 2 npc 2
      spawnNpc(66655, { x: 132335.812, y: 31661.671875, z: 3451.463623046875 }, -3.11628197058968, 1902, 618) // horse
      spawnNpc(66656, { x: 136433.984375, y: 8149.11767578125, z: 2488.249755859375 }, 1.5714674433895965, 1038, 203) // Lokian Watch Injured 1
      spawnNpc(66657, { x: 136636.640625, y: 8462.1728515625, z: 2488.249755859375 }, -1.5312004477075984, 1039, 203) // Lokian Watch Injured 2
      spawnNpc(66658, { x: 136705.65625, y: 7897.63330078125, z: 2481.794921875 }, -1.1758921477135869, 1700, 70) // Lokian Watch Sentry L
      spawnNpc(66659, { x: 136978.71875, y: 8340.2880859375, z: 2487.568115234375 }, -0.04036286948124093, 1700, 70) // Lokian Watch Sentry M
      spawnNpc(66660, { x: 136829.59375, y: 8860.0927734375, z: 2486.25732421875 }, 0.5619163373623589, 1700, 70) // Lokian Watch Sentry R
      spawnNpc(66661, { x: 136300.8125, y: 19224.166015625, z: 2042.749755859375 }, 2.253321903604764, 1004, 172) // Ruinwatch Dying 1
      spawnNpc(66662, { x: 135993.15625, y: 19843.845703125, z: 2042.749755859375 }, -1.8334905367203127, 6040, 182) // Ruinwatch Dying 2
      spawnNpc(66663, { x: 135939.84375, y: 19791.02734375, z: 2042.749755859375 }, -1.3002404653315667, 1003, 172) // Ruinwatch Dying 3
      spawnNpc(66664, { x: 136040.875, y: 19652.982421875, z: 2042.749755859375 }, 0.7060146576243663, 6040, 182) // Ruinwatch Dying 4
      spawnNpc(66665, { x: 135552.1875, y: 19534.904296875, z: 2040.570068359375 }, -2.3145852613209468, 1700, 70) // Ruinwatch Sentry L
      spawnNpc(66666, { x: 135926.3125, y: 19209.2421875, z: 2036.687744140625 }, -2.1644468917066395, 1700, 70) // Ruinwatch Sentry M
      spawnNpc(66667, { x: 136480.984375, y: 19288.419921875, z: 2042.749755859375 }, -0.7700583555185919, 1700, 70) // Ruinwatch Sentry R
    })
  }

  // This blocks us from sending invalid data to the server, based on our fake NPC's gameIds.
  // C_DIALOG_EVENT is not mapped in Toolbox by default, so it is a tryHook. This prevents needless errors.
  d.tryHook('C_DIALOG_EVENT', 1, (e) => { if (e.unk1 >= 11100 && e.unk1 <= 696969) return false })

  d.hook('C_DIALOG', '*', (e) => {
    if ([55566, 55568].includes(e.id)) { // This allows you to click a button to shuttle across the Baldera gate, which ignores the invisible wall.
      if (e.index == 1) {
        d.send('S_MOVE_SHUTTLE', 1, {
          gameId: 55567n, // gameId of the shuttle
          from: { x: 122033, y: 15508, z: 2294 }, // spawn location of the shuttle
          to: { x: 122408, y: 15076, z: 2233 }, // destination location of the shuttle
          time: 5000 // time to travel between the "from" and "to" locations.
        })
        setTimeout(() => { // return the shuttle after a certain amount of time in case someone sends it without standing on it.
          d.send('S_MOVE_SHUTTLE', 1, {
            gameId: 55567n,
            from: { x: 122408, y: 15076, z: 2233 },
            to:  { x: 122033, y: 15508, z: 2294 },
            time: 5000
          })
        }, 10000);
      }
      return false
    }
  })

  d.command.add(`shuttlego`, (arg) => {
    d.send('S_MOVE_SHUTTLE', 1, {
      gameId: 55567n, // gameId of the shuttle
      from: { x: 122033, y: 15508, z: 2294 }, // spawn location of the shuttle
      to: { x: 122408, y: 15076, z: 2233 }, // destination location of the shuttle
      time: 5000 // time to travel between the "from" and "to" locations.
    })
  })

  // Block sending invalid shuttle packets -snug
  // The inShuttle bool allows us to block C_PLAYER_LOCATION, to reduce unnecessary data being sent to the server. -ambush
  d.hook('C_GET_IN_SHUTTLE', '*', (e) => {
    if(e.gameId == 55567){ infakeShuttle = true; return false }
  })

  d.hook('C_GET_OUT_SHUTTLE', '*', (e) => {
    if(e.gameId == 55567){ infakeShuttle = false; return false }
  })

  d.hook('C_PLAYER_LOCATION', '*', (e) => {
    if(infakeShuttle){ return false }
  })

  // Get current location and spawn npc and shuttle when close enough -snug
  // Display a message in chat (with the same color as in-game notices) to signify the loading -ambush
  for (let set of ['C_PLAYER_LOCATION', 'C_PLAYER_FLYING_LOCATION', 'S_ACTION_END'])
    d.hook(set, '*', { order: -99999 }, (e) => {
      if (errorPresent || d.game.me.zone !== 7001) return; // Don't load this if an error is present.
      if (dist(e.loc, { x:122109.8125,  y:15584.78515625, z:2295.34375 }) < 1000 && !tempSpawned && d.game.me.zone == 7001 && !errorPresent) {
        // This is a fancier message that appears at the center top of your screen.
        d.send('S_DUNGEON_EVENT_MESSAGE', 2, {
          type: 66,
          chat: true,
          channel: 21,
          message: `<font color="#ED1C24"> Are those... Valkyon soldiers near the seal to Baldera?</font>`
        })
        tempSpawned = true
        // Two NPCs that will control the Shuttle.
        spawnNpc(55566, { x:122109.8125,  y:15584.78515625, z:2295.34375 }, -2.5, 1200, 172)
        spawnNpc(55568, { x:122301.203125,  y:15029.5361328125, z:2226.81494140625 }, 0.5, 1002, 172)
        d.send('S_SPAWN_SHUTTLE', 3, { gameId: 55567n, id: 906901, loc: { x: 122033, y: 15508, z: 2302 }, w: 0 }) // This spawns the shuttle, just like spawnNPC spawns an NPC.
      }
    })

  // This function checks the distance between 2 locs -snug
  function dist(loc1, loc2) {
    return Math.sqrt(
      Math.pow(loc2.x - loc1.x, 2) +
      Math.pow(loc2.y - loc1.y, 2) +
      Math.pow(loc2.z - loc1.z, 2)
    );
  }

  // This function allows us to send fake dialog from NPCs.
  function sDialog(gameId, key1, key2, txtid, id, buttons) {
    d.send('S_DIALOG', 3, {
      gameId: gameId,
      type: 1,
      key1: key1,
      key2: key2,
      textId: txtid,
      id: id,
      autoClose: true,
      maxRepeatCount: -1,
      buttons: buttons
    })
    return false
  }

  // This function will spawn the NPCs, duh.
  function spawnNpc(gameId, loc, w, tId, hId, icon) {
    addEffect(gameId, icon)
    d.send('S_SPAWN_NPC', 12, {
      gameId: gameId,
      loc: loc,
      w: w,
      relation: 12,
      templateId: tId,
      huntingZoneId: hId
    })
  }

  // Called in the function above, this function allows us to put icons above an NPC's head.
  function addEffect(gameId, effect) {
    setTimeout(() => {
      d.send('S_PLAY_EFFECT', 1, {
        gameId: gameId,
        id: effect
      })
    }, 500);
  }
}