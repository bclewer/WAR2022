
set arg1=%1
cd %arg1%

FOR /R %arg1% %%x IN (*.php) DO del *.php

FOR /R %arg1% %x IN (*.html) DO ren "$%x" *.php

