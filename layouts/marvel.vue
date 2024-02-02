<template>
  <section class="w-screen flex-1 h-full bg-black flex flex-col overflow-hidden">
      <nav class="flex justify-between items-center px-3 border-b-2 border-slate-300	 ">
          <NuxtLink to="/marvel"
              class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center">
              marvellous</NuxtLink>
          <NuxtLink to="/favourites"
              class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center">
              Favourites</NuxtLink>
      </nav>
      <slot />
  </section>
</template> 

<!-- <script setup>console.log('inside marvel layout')</script> -->