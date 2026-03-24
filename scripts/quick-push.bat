@echo off
echo 🚀 Быстрый push на все аккаунты GitHub
echo.

echo 📦 Добавляем изменения...
git add .

set /p commit_msg="💬 Введите сообщение коммита: "
if "%commit_msg%"=="" set commit_msg=Update project

echo 📝 Создаем коммит...
git commit -m "%commit_msg%"

echo.
echo 🎯 Пушим на все аккаунты...

echo 1️⃣ fox0110011-coder...
git push https://fox0110011-coder:%GITHUB_TOKEN_1%@github.com/fox0110011-coder/pollination-flow-manager.git

echo 2️⃣ ozehefageza031-rgb...
git push https://ozehefageza031-rgb:%GITHUB_TOKEN_2%@github.com/ozehefageza031-rgb/pollination-flow-manager.git

echo 3️⃣ ang3l043k018-cmyk...
git push https://ang3l043k018-cmyk:%GITHUB_TOKEN_3%@github.com/ang3l043k018-cmyk/pollination-flow-manager.git

echo.
echo ✅ Готово! Проект загружен на все аккаунты
echo.
echo 💡 Убедитесь что установлены переменные окружения:
echo    GITHUB_TOKEN_1, GITHUB_TOKEN_2, GITHUB_TOKEN_3
pause