<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  @vite('resources/css/app.css')
  @yield('styles')
</head>
<body>
  @include('frontOffice.layouts.navbar')
  <div class="container mx-auto">
    @yield('content')
  </div>

  <div id="modalContainer" class="w-full h-full fixed top-0 left-0 flex justify-center items-center hidden" style="background: rgba(0, 0, 0, 0.5);">
    <div id="modalContent" class="bg-white w-96 h-40 relative">
      <h1 id="closeModal" class="absolute top-0 right-0 w-6 h-6 bg-red-400 font-bold flex justify-center items-center text-white rounded-full text-2xl">&times;</h1>
      <h1>555</h1>
    </div>
  </div>


  <div class="popup" id="popup-1">
    <div class="overlay"></div>
    <div class="content" id="contentM">
      <div class="close-btn" id="closeM">&times;</div>
      <h1>Title</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum nostrum quaerat, error animi voluptatum aperiam voluptate ad dicta optio dolor dolorum deserunt praesentium, adipisci magnam dignissimos ab maiores accusantium eveniet?</p>
    </div>
  </div>

  @yield('scripts')
</body>
</html>