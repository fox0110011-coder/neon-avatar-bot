# 🚀 Инструкция по деплою на GitHub

## Быстрый способ (рекомендуется)

### 1. Установите переменные окружения

**Windows (PowerShell):**
```powershell
$env:GITHUB_TOKEN_1="your_token_1_here"
$env:GITHUB_TOKEN_2="your_token_2_here"
$env:GITHUB_TOKEN_3="your_token_3_here"
```

**Linux/Mac (Bash):**
```bash
export GITHUB_TOKEN_1="your_token_1_here"
export GITHUB_TOKEN_2="your_token_2_here"
export GITHUB_TOKEN_3="your_token_3_here"
```

### 2. Запустите автоматический деплой

```bash
npm run deploy
```

## Ручной способ

### Прямые команды push (замените токены):

```bash
# Аккаунт 1: fox0110011-coder
git push https://fox0110011-coder:YOUR_TOKEN_1@github.com/fox0110011-coder/pollination-flow-manager.git

# Аккаунт 2: ozehefageza031-rgb  
git push https://ozehefageza031-rgb:YOUR_TOKEN_2@github.com/ozehefageza031-rgb/pollination-flow-manager.git

# Аккаунт 3: ang3l043k018-cmyk
git push https://ang3l043k018-cmyk:YOUR_TOKEN_3@github.com/ang3l043k018-cmyk/pollination-flow-manager.git
```

## Ссылки на репозитории

- 🦊 [fox0110011-coder](https://github.com/fox0110011-coder/pollination-flow-manager)
- 🌈 [ozehefageza031-rgb](https://github.com/ozehefageza031-rgb/pollination-flow-manager)  
- 🎨 [ang3l043k018-cmyk](https://github.com/ang3l043k018-cmyk/pollination-flow-manager)

## Быстрые скрипты

- **Windows:** `scripts/quick-push.bat`
- **Linux/Mac:** `scripts/quick-push.sh`

Просто запустите нужный скрипт после установки переменных окружения!