<template>
  <form class="bg-white shadow max-w-lg mx-auto rounded">
    <h3 class="text-xl text-gray-900 font-bold bg-gray-200 p-4">Sign up</h3>

    <div class="p-5">
      <div class="flex">
        <label class="w-1/2 flex flex-col pr-1 mb-4">
          First name
          <input class="border rounded px-3 py-1 mt-2" type="text" />
        </label>

        <label class="w-1/2 flex flex-col pl-1 mb-4">
          Last name
          <input class="border rounded px-3 py-1 mt-2" type="text" />
        </label>
      </div>

      <label class="flex flex-col mb-4">
        Email
        <input class="border rounded px-3 py-1 mt-2" type="email" />
      </label>

      <label class="flex flex-col mb-4">
        Password
        <input class="border rounded px-3 py-1 mt-2" type="password" />
      </label>

      <button class="block w-full bg-indigo-700 text-white font-bold rounded px-4 py-2">Sign up</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>
