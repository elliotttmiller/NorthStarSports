import os
import sys

# Set the root directory to scan (default: current directory)
root_dir = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()

def remove_empty_dirs_and_files(path):
    removed = []
    # Walk the directory tree bottom-up
    for dirpath, dirnames, filenames in os.walk(path, topdown=False):
        # Remove empty files
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            if os.path.getsize(file_path) == 0:
                os.remove(file_path)
                removed.append(file_path)
        # Remove empty directories
        for dirname in dirnames:
            dir_full_path = os.path.join(dirpath, dirname)
            if not os.listdir(dir_full_path):
                os.rmdir(dir_full_path)
                removed.append(dir_full_path)
    return removed

if __name__ == "__main__":
    removed_items = remove_empty_dirs_and_files(root_dir)
    print("Removed the following empty files and directories:")
    for item in removed_items:
        print(item)
