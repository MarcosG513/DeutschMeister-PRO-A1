@echo off
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot"
echo JAVA_HOME set to: %JAVA_HOME%
call gradlew.bat assembleDebug --no-daemon
