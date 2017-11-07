<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Beyond Zero Campaign</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="keywords">
  <meta content="" name="description">
  <link href="../imgs/Mobile logo.jpg" rel="shortcut icon">
  <link href="../lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="../css/style.css" rel="stylesheet">
  <link href="../css/default.css" rel="stylesheet">
</head>

<body>
  <div id="preloader"></div>

  <section id="hero">
    <div class="hero-container">
      <div class="wow fadeIn">
        
        <div class="hero-logo">
          <i><img class="img-logo-top" src="../imgs/Mobile logo w-slogan artistic.png" alt="Beyond Zero Campaign"/></i>
        </div>

        <h1>First Lady, Margaret Kenyatta  Beyond Zero Child Births Mortality Rate Campaign Assistant.</h1>
        <h2>Tack <span class="rotating">The Closest Mobile Clinic, Location of Incoming for rescure Mobile Clinic, Mobile Clinic By It's Staffs' ID, Available for Use Mobile Clinics.</span></h2>
        <div class="actions">
          <a href="#about" class="btn-get-started">Request For Mobile Clinic</a>
          <a href="#services" class="btn-services">Other Services</a>
        </div>
      </div>
    </div>
  </section>

  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
     <i><img class="img-logo-nav" src="../imgs/Mobile logo w-slogan artistic.png" alt="Beyond Zero Campaign"/></i>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><a href="#hero">Home</a></li>
            <li class="menu-has-children"><a href="#services">Services</a>
            <ul>
              <li><a href="#">Remote Access</a></li>
              <li class="menu-has-children"><a href="#">Emmergency and Rescue</a>
                <ul>
                  <li><a href="#">Seeking Assistance</a></li>
                  <li><a href="#">Locate Nearst Available Mobile Clinic</a></li>
                  <li><a href="#">Tack Nearest Available Mobile Clinic</a></li>
                  <li><a href="#">Search Mobile Clinic by It's Specs</a></li>
                  <li><a href="#">Locate Incoming Mobile Clinic</a></li>
                </ul>
              </li>
              <li><a href="#">Community Work</a></li>
              <li><a href="#">Tuinuane Foundation</a></li>
              <li><a href="#">Job Vacancies</a></li>
            </ul>
          </li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="../">Log Out</a></li>
          <li id="user-icon">
          <img src="../imgs/user2.png" alt="Admin" id="admin-img" />
        </li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- #header -->
<?php
 require_once('services.php');
 require_once('gallery.php');
 require_once('testimonials.php');

  ?>

  <footer id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="copyright">
              &copy; Copyright <?php echo date('Y'); ?> <strong>Beyond Zero Campaign.</strong>. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
  </footer>

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
<script src="../js/jQuery-2.1.4.min.js"></script>
<script src="../lib/bootstrap/js/bootstrap.min.js"></script>
<script src="../lib/superfish/hoverIntent.js"></script>
<script src="../lib/superfish/superfish.min.js"></script>
<script src="../lib/morphext/morphext.min.js"></script>
<script src="../lib/wow/wow.min.js"></script>
<script src="../lib/stickyjs/sticky.js"></script>
<script src="../lib/easing/easing.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyC5oGUwT09nELrlGwrYOwJQj68yvSzUHGs&sensor=true"></script>
<script type="text/javascript" src="../js/gmaps.js"></script>
<script type="text/javascript" src="../js/bootbox.js"></script>
<script src="../js/custom.js"></script>


</body>
</html>
