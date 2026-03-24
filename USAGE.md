# 🚀 Multi-Repo Deployment System

Система автоматического деплоя на 15 GitHub репозиториев.

## 📦 Структура

- **3 аккаунта** × **5 репозиториев** = **15 репозиториев**
- Все репозитории содержат одинаковый код
- Изменения синхронизируются автоматически

## 🔧 Настройка

Установите переменные окружения с вашими GitHub токенами:

```powershell
# Windows PowerShell
$env:GITHUB_TOKEN_1="your_token_1"
$env:GITHUB_TOKEN_2="your_token_2"
$env:GITHUB_TOKEN_3="your_token_3"
```

```bash
# Linux/Mac
export GITHUB_TOKEN_1="your_token_1"
export GITHUB_TOKEN_2="your_token_2"
export GITHUB_TOKEN_3="your_token_3"
```

## 🚀 Команды

### Создание репозиториев (только первый раз)
```bash
npm run create:repos
```

### Деплой на все 15 репозиториев
```bash
npm run deploy:all
```

### Деплой с кастомным сообщением
```bash
npm run deploy:all "Your commit message"
```

## 📝 Рабочий процесс

1. Вносите изменения в код
2. Запускаете `npm run deploy:all`
3. Код автоматически загружается на все 15 репозиториев

## 🔗 Репозитории

Каждый аккаунт содержит 5 репозиториев:
- pollination-flow-manager
- neon-avatar-bot
- cyber-dashboard
- quantum-code-gen
- stellar-data-sync

Токены хранятся в файле `TOKENS.txt` (не коммитится в git)