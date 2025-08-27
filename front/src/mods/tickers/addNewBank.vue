<template>
  <div class="p-2 w-1/3">
    <div class="card bg-base-200 rounded-2xl p-4">
      <h2 class="text-md font-bold mb-6 text-primary flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Nova Corretora
      </h2>

      <!-- Nome -->
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Nome</span>
        </label>
        <div class="relative">
          <input
            type="text"
            class="input input-bordered w-full"
            min="1"
            placeholder="Nome da corretora"
          />
        </div>
      </div>
      <!-- Moeda -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium">Moeda</span>
        </label>
        <div class="relative">
          <select
            name="corretora"
            id="corretora"
            class="cursor-pointer select select-bordered w-full"
          >
            <option value="BRL">R$ - BRL</option>
            <option value="USD">$ - USD</option>
            <option value="EUR">€ - EUR</option>
          </select>
        </div>
      </div>
      <!-- Data -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium">Data Abertura da Conta</span>
        </label>
        <div class="relative">
          <input
            type="date"
            class="input input-bordered w-full pl-10"
            required
          />
          <span class="absolute left-3 top-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
        </div>
      </div>
      <!-- Forçar Tailwind a manter as classes de cor -->
      <div class="hidden">
        <div class="bg-slate-500"></div>
        <div class="bg-gray-500"></div>
        <div class="bg-zinc-500"></div>
        <div class="bg-neutral-500"></div>
        <div class="bg-stone-500"></div>

        <div class="bg-red-500"></div>
        <div class="bg-orange-500"></div>
        <div class="bg-amber-500"></div>
        <div class="bg-yellow-500"></div>
        <div class="bg-lime-500"></div>

        <div class="bg-green-500"></div>
        <div class="bg-emerald-500"></div>
        <div class="bg-teal-500"></div>
        <div class="bg-cyan-500"></div>
        <div class="bg-sky-500"></div>
        <div class="bg-blue-500"></div>
        <div class="bg-indigo-500"></div>

        <div class="bg-violet-500"></div>
        <div class="bg-purple-500"></div>
        <div class="bg-fuchsia-500"></div>
        <div class="bg-pink-500"></div>
        <div class="bg-rose-500"></div>
      </div>

      <!-- Cor -->
      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium">Cor</span>
        </label>
        <div class="relative">
          <select class="select select-bordered w-full" name="cor" id="cor">
            <option disabled selected>Escolha uma cor</option>

            <!-- Cores Neutras -->
            <option value="slate">Slate</option>
            <option value="gray">Gray</option>
            <option value="zinc">Zinc</option>
            <option value="neutral">Neutral</option>
            <option value="stone">Stone</option>

            <!-- Cores Quentes -->
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="amber">Amber</option>
            <option value="yellow">Yellow</option>
            <option value="lime">Lime</option>

            <!-- Cores Frias -->
            <option value="green">Green</option>
            <option value="emerald">Emerald</option>
            <option value="teal">Teal</option>
            <option value="cyan">Cyan</option>
            <option value="sky">Sky</option>
            <option value="blue">Blue</option>
            <option value="indigo">Indigo</option>

            <!-- Cores Roxas/Rosas -->
            <option value="violet">Violet</option>
            <option value="purple">Purple</option>
            <option value="fuchsia">Fuchsia</option>
            <option value="pink">Pink</option>
            <option value="rose">Rose</option>
          </select>
        </div>
      </div>

      <div class="form-control mt-4">
        <label class="label">
          <span class="label-text font-medium">Informações Adicionais</span>
        </label>
        <div class="relative">
          <input
            type="text"
            class="input input-bordered w-full"
            min="1"
            placeholder="Informações Adicionais"
          />
        </div>
      </div>
    </div>
  </div>
</template>
