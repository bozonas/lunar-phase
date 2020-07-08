
with open("mooninfo_2020.json", "r") as file_in:
  for i, line in enumerate(file_in):
    if "]" in line or "[" in line:
      continue
    newfile = open(f"../public/mooninfo/mooninfo.{i}.json", "w")
    newfile.write(line.rstrip()[:-1])
    newfile.close()