# PCではトップレベルawaitをmainに包みます。
import asyncio

async def main():
    import asyncio
    async def delayed_hint():
        await asyncio.sleep(0.01)
        return "東へ進もう"
    print(await delayed_hint())

if __name__ == '__main__':
    asyncio.run(main())
