// player.model.ts

export class Player {
    name: string;
    playerClass: string;
    life: number;
    lifeMax: number;
    spellPoints: number;
    spellPointsMax: number;
  
    constructor(name: string, playerClass: string, lifeMax: number, spellPointsMax: number) {
      this.name = name;
      this.playerClass = playerClass;
      this.life = lifeMax;
      this.lifeMax = lifeMax;
      this.spellPoints = spellPointsMax;
      this.spellPointsMax = spellPointsMax;
    }
  }
  