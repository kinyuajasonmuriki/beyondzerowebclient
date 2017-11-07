<?php
if(isset($_POST['data'])){
$file = fopen("mobile_clinics.json", "r");
$data = fread($file, filesize("mobile_clinics.json"));
fclose($file);
echo json_encode($data);
}
 ?>
