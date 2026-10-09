from dataclasses import dataclass

@dataclass
class Player:
    name: str
    hp: int = 100

    def take_damage(self, amount: int) -> None:
        self.hp = max(0, self.hp - max(0, amount))

player = Player("探索者")
player.take_damage(20)
print(player)
