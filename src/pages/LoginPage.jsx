

export default function LoginPage() {
  return (
    <>
        <div class=" flex justify-center items-center h-screen">
            <div class="w-1/2 h-screen hidden lg:block">
            <img src="/loginImage.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
            </div>

            <div class= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 class="text-4xl font-semibold mb-4">Welcome Back!</h1>
                <form action="#" method="POST">
                    <div class="mb-4 ">
                    <label for="username" class="block text-[#333] font-semibold mb-1">Email</label>
                    <input type="text" id="username" name="username" class="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500" autocomplete="off" />
                    </div>
                    
                    <div class="mb-4">
                    <label for="password" class="block text-[#333] font-semibold mb-1">Password</label>
                    <input type="password" id="password" name="password" class="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500" autocomplete="off" />
                    </div>
                
                    <div class="mb-6">
                    Don't have an account? <a href="#" class="text-blue-500 hover:underline"> Sign up</a> now!
                    </div>
                    
                    <button type="submit" class="transition bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                </form>
            </div>
        </div>
    </>
  )
}
