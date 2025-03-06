async function test() {
  const arr = new Array(10000).fill(0).map(async () => {
    return await fetch("http://localhost:3000/change-many", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId: "7e45261b-41a5-4919-b688-b10e2500f516",
        amount: -2,
      }),
    });
  });

  const result = await Promise.allSettled(arr);

  console.log(
    "successCount",
    result.filter((item) => {
      if (item.status === "rejected") {
        return false;
      }

      return item.value.status <= 300;
    }).length,
  );
}

void test();
