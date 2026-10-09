# PCではトップレベルawaitをmainに包みます。
import asyncio

async def main():
    import asyncio
    async def delayed_hint():
        return ""
    print(await delayed_hint())

if __name__ == '__main__':
    asyncio.run(main())
