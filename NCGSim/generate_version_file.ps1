param ([string]$targetfile)

$buildcount = git rev-list --count HEAD
$lasthash = git rev-list --max-count=1 --abbrev-commit HEAD
$branchname = git rev-parse --abbrev-ref HEAD

if($branchname -eq 'master'){
    [void][System.IO.File]::WriteAllText($targetfile, $buildcount + "-" + $lasthash)
}
else{
    [void][System.IO.File]::WriteAllText($targetfile, $buildcount + "-" + $branchname+ "-" + $lasthash)
}