Add-Type -AssemblyName System.Drawing
$accDir = 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\accessories'
if (!(Test-Path $accDir)) {
    New-Item -ItemType Directory -Path $accDir | Out-Null
}

function Crop-Image($srcPath, $dstPath, $x, $y, $w, $h) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $crop = $src.Clone($rect, $src.PixelFormat)
    $crop.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $src.Dispose()
    $crop.Dispose()
    Write-Output "Cropped $dstPath"
}

# 01 Canvas
Copy-Item 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_604_400x225.jpg' "$accDir\accessory-01-canvas.jpg"
Write-Output "Saved accessory-01-canvas.jpg"

# 02 Skirt (Page 5, right side image)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_597_787x1111.jpg' "$accDir\accessory-02-skirt.jpg" 430 170 345 190

# 03 Rope spacer
$bmp3 = [System.Drawing.Bitmap]::FromFile('C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_675_359x476.bmp')
$bmp3.Save("$accDir\accessory-03-rope-spacer.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp3.Dispose()
Write-Output "Saved accessory-03-rope-spacer.jpg"

# 04 Wire
Copy-Item 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_671_400x225.jpg' "$accDir\accessory-04-wire.jpg"
Write-Output "Saved accessory-04-wire.jpg"

# 05 Corner Pads (Page 7 top)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_734_533x1111.jpg' "$accDir\accessory-05-corner-pads.jpg" 38 40 455 240

# 08 Turnbuckle (Page 7 bottom)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_734_533x1111.jpg' "$accDir\accessory-08-turnbuckle.jpg" 38 565 455 245

# 06 Bent Corner Pads (Page 8 top)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_737_507x1111.jpg' "$accDir\accessory-06-bent-corner-pads.jpg" 20 40 465 240

# 09 Rope Cover Handstitch (Page 8 bottom)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_737_507x1111.jpg' "$accDir\accessory-09-rope-cover-handstitch.jpg" 20 560 465 250

# 07 Buckle Cover (Page 9 top)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_740_534x1111.jpg' "$accDir\accessory-07-buckle-covers.jpg" 20 40 490 245

# 10 Ring Stairs (Page 9 bottom)
Crop-Image 'C:\Users\Nadeem\.gemini\antigravity\scratch\fighter-forge\public\assets\extracted\obj_740_534x1111.jpg' "$accDir\accessory-10-ring-stairs.jpg" 20 560 490 250

Write-Output "ALL 10 ACCESSORIES CROPPED SUCCESSFULLY!"
