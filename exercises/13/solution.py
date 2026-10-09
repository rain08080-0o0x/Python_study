from dataclasses import dataclass
@dataclass
class Player:
    hp: int = 100
    def heal(self, amount: int) -> None:
        self.hp = min(100, self.hp + max(0, amount))
player = Player(40)
player.heal(20)
print(player.hp)
