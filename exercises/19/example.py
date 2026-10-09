# PCではトップレベルawaitをmainに包みます。
import asyncio

async def main():
    import asyncio
    async def delayed_reply():
        await asyncio.sleep(0.05)
        return "応答"
    result = await delayed_reply()
    print(result)

if __name__ == '__main__':
    asyncio.run(main())
