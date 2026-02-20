import pandas as pd
import json

# 📂 Load Excel file with sheet name
file_path = "./data/ACADFLOW_STUDENT CRED DIV A & B.xlsx"
sheet_name = "SE-A-FH26"

df = pd.read_excel(file_path, sheet_name=sheet_name)

# 🔍 Preview columns
print("Columns:", df.columns)

# 🧠 Safe value handler
def safe(val):
    return str(val).strip() if pd.notna(val) else ""

# 🔥 Convert to required format
data = []

for _, row in df.iterrows():
    obj = {
        "name": safe(row["Student Name"]),
        "email": safe(row["Email"]),
        "username": safe(row["Email"]),  # using email as username
        "password": safe(row["Password"]),
    }
    data.append(obj)

# 💾 Save to JSON file
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)

# 📤 Print result
print(json.dumps(data, indent=2))