import os, glob, sys

print("=== DEBUG ===")
print("cwd:", os.getcwd())
print("files here:", glob.glob("*"))
print("pythonpath (first 5):", sys.path[:5])

try:
    import main
    print("import main: OK")
except Exception as e:
    print("import main FAILED:", repr(e))
    raise
