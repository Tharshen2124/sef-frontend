

export default function LoginPage() {
  return (
    <>
        <div class=" flex justify-center items-center h-screen">
        <div class="w-1/2 h-screen hidden lg:block relative">
          <img
            src="/loginImage.jpg"
            alt="Placeholder Image"
            class="object-cover w-full h-full"
          />
          {/* Overlay */}
          <div class="absolute inset-0 bg-blue-500 opacity-50"></div>
          {/* Text */}
          <div class="absolute bottom-10 left-24 right-0 p-8 text-center text-white">
            <p class="text-2xl font-bold italic text-left">
              "A diligent hawker today, can be a great 
            </p>
            <p class="text-2xl font-bold italic mb-2 text-left">
            tycoon tomorrow."
            </p>
            <p class="text-sm text-left">- Ernest Agyemang Yeboah</p>
          </div>
        </div>


            <div class= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 class="text-4xl font-semibold mb-10">Welcome Back!</h1>
                <form action="#" method="POST">
                    <div class="mb-4 ">
                    <label for="username" class="block text-[#333] font-semibold mb-1">IC Number:</label>
                    <input type="text" id="username" name="username" class="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500" autocomplete="off" />
                    </div>
                    
                    <div class="mb-4">
                    <label for="password" class="block text-[#333] font-semibold mb-1">Password:</label>
                    <input type="password" id="password" name="password" class="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500" autocomplete="off" />
                    </div>
                
                    <div class="mb-6">
                    Don’t have an account? Sign up <a href="#" class="text-blue-500 hover:underline">here</a>!
                    </div>
                    
                    <button type="submit" class="transition bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 px-4 w-full">Login</button>
                </form>
            </div>
        </div>
    </>
  )
}
