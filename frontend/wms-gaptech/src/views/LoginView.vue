<template>
	<section>
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<a href="#" class="flex items-center mb-6 text-2xl font-semibold text-black">
				<img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
				GapTech
			</a>
			<div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border-2 border-blue-primary">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">Login to your account</h1>
					<form class="space-y-4 md:space-y-6" action="#">
						<div>
							<label for="username" class="block mb-2 text-sm font-medium text-black">Your username</label>
							<input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary" placeholder="johndoe" required />
						</div>
						<div>
							<label for="password" class="block mb-2 text-sm font-medium text-black">Password</label>
							<input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5 focus:ring-1 focus:ring-blue-primary" required />
						</div>
						<div class="grid place-items-end">
							<a href="#" class="text-sm font-medium text-black hover:underline">Forgot password?</a>
						</div>
						<button type="submit" class="w-full text-white bg-blue-primary hover:bg-blue-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>
