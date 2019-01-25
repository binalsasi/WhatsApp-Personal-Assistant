<?php
print_r($_POST);
$msg = $_POST['msg'];
$time = $_POST['time'];
$file_name = 'file.txt';
$fdr = fopen($file_name, 'w') or die('Cannot open file1: '.$file_name);
if(isset($_GET['q']))
fwrite($fdr, $_GET['q']);
else
fwrite($fdr, "NO");	
fwrite($fdr, implode(",",$_REQUEST));
fwrite($fdr, "ASDA");
fclose($fdr);


exec("python eventadd.py {$msg} {$time} 2>&1", $result);
print_r($result);
?>