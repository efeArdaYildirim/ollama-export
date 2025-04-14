# Ollama Export CLI Tool

A simple Node.js CLI utility to export Ollama models as `.tar` or tar streams.  
You can use this tool to archive and transport models managed by Ollama, especially when moving between systems or performing backups.

> **Note**: This tool works with Ollama's internal model storage. You must set the `OLLAMA_PATH` environment variable to your `.ollama` directory path.

---

## 🔧 Features

- Exports any local Ollama model to a `.tar` file.
- Supports streaming the `.tar` archive to `stdout`.
- Works on Linux, macOS (probably), and Windows.
- Can be called via two interchangeable commands: `ollama-export` or `oexport`.

---

## 🧩 Installation

Clone or download the repository, then install dependencies:

```bash
npm i ollama-export
```

Make sure the script is globally executable if you want to call it from anywhere:

```bash
npm link
```

---

## 🌍 Environment Setup

You **must** set the `OLLAMA_PATH` environment variable to point to the `.ollama` directory on your system. This is where Ollama stores downloaded models.

### Linux / macOS

If your `.ollama` folder is in your home directory:

```bash
export OLLAMA_PATH="$HOME/.ollama"
```

You can add this to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) to make it permanent.

### Windows (CMD)

```cmd
set OLLAMA_PATH=C:\Users\YourUsername\.ollama
```

### Windows (PowerShell)

```powershell
$env:OLLAMA_PATH = "C:\Users\YourUsername\.ollama"
```

To make it permanent, add it to your system's environment variables:
1. Open **System Properties** → **Environment Variables**
2. Add a new **User Variable** named `OLLAMA_PATH` with the path to `.ollama`

---

## 🧪 Usage

### Syntax

```bash
ollama-export <model-name:version> [-o]
```

Or using the shorthand:

```bash
oexport <model-name:version> [-o]
```

- `<model-name:version>` – required, the model and its version. Example: `mistral:latest`
- `-o` – optional flag. If used, exports to `stdout` as a tar stream. **This must be the second argument. Order matters!**

---

## 📦 Examples

### 1. Export model to file (default behavior)

This will create a `mistral_latest.tar` file in the current directory:

#### Linux / macOS

```bash
ollama-export mistral:latest 
```

#### Windows (CMD or PowerShell)

```cmd
ollama-export mistral:latest 
```

### 2. Pipe model tar to another process or output (stream mode)

This exports the tar archive directly to `stdout`.

#### Linux

```bash
ollama-export mistral:latest -o | tar -tvf -
```

Sure! Here's the **pipe to stdout** usage example with `zstd` compression:

---

### Exporting and Compressing with `zstd` via Pipe

#### Linux / macOS

```bash
ollama-export mistral:latest -o | zstd -o mistral_latest.tar.zst
```

> ⚠️ The `-o` flag **must be the second argument**. If the order is wrong, the tool will not work.

---

## 🧩 Notes

- Make sure the model exists in your local `.ollama` directory.
- If you mistype the argument order (e.g., `-o` first), the tool will **not** work.
- You can use either `ollama-export` or `oexport`, both work identically.

---

## ✅ Example Output

Exporting `llama2:7b` to a file:

```bash
oexport llama2:7b 
```

---

## 🛠 Troubleshooting

### "Cannot find .ollama directory" error

Ensure `OLLAMA_PATH` is set correctly. You can test it:

#### Linux/macOS

```bash
echo $OLLAMA_PATH
```

#### Windows (PowerShell)

```powershell
echo $env:OLLAMA_PATH
```

If it doesn't point to the right folder, update it accordingly.

---

### 📥 How to Import

To import a model that was previously exported:

1. **Extract the `.tar` file into your `.ollama` directory**  
   (This should be the directory you set via `OLLAMA_PATH`.)

   #### Linux / macOS:

   ```bash
   tar -xf mistral_latest.tar -C "$OLLAMA_PATH"
   ```

   #### Windows (PowerShell):

   ```powershell
   tar -xf .\mistral_latest.tar -C $env:OLLAMA_PATH
   ```

2. **Restart the Ollama service** to make it recognize the new model:

   #### Linux:

   ```bash
   systemctl restart ollama
   ```

   #### macOS (Homebrew):

   ```bash
   brew services restart ollama
   ```

   #### Windows (if running as a service):

   Restart via Services panel or with PowerShell:

   ```powershell
   Restart-Service -Name "Ollama"
   ```

---

#### ❗ Model doesn't show up in `ollama list`?

In some cases, Ollama may not list the imported model right away. To fix this:

```bash
ollama pull mistral:latest
```

> If the files are already present, Ollama will **not re-download** them — it will just **verify their integrity** and register the model locally.

## 📃 License

```
MIT License

Copyright (c) 2025 efeArdaYildirim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

