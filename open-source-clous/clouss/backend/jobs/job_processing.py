import re
from .models import JobList, ToolList, RequirementList, LanguageList, ResponsibilitiesList, BenefitsList


def extract_job_data(response_text):
    job_data = {
        "title": "",
        "description": "",
        "location": "",
        "contract_type": "",
        "maximum_salary": 0,
        "minimum_salary": 0,
        "currency": "",
        "tools": [],
        "languages": [],
        "requirements": [],
        "responsibilities": [],
        "benefits": [],
    }

    lines = response_text.split('\n')

    for line in lines:
        line = line.strip()
        if line.startswith("Title: "):
            job_data["title"] = line.replace("Title: ", "")
        elif line.startswith("Description: "):
            job_data["description"] = line.replace("Description: ", "")
        elif line.startswith("Location: "):
            job_data["location"] = line.replace("Location: ", "")
        elif line.startswith("Contract Type: "):
            job_data["contract_type"] = line.replace("Contract Type: ", "")
        elif line.startswith("Maximum Salary: "):
            salary = re.search(r'\d+', line)
            if salary:
                job_data["maximum_salary"] = int(salary.group())
        elif line.startswith("Minimum Salary: "):
            salary = re.search(r'\d+', line)
            if salary:
                job_data["minimum_salary"] = int(salary.group())
        elif line.startswith("Currency: "):
            job_data["currency"] = line.replace("Currency: ", "")
        elif line.startswith("Tools:"):
            job_data["tools"] = line.replace("Tools:", "").split(',')
        elif line.startswith("Languages:"):
            job_data["languages"] = line.replace("Languages:", "").split(',')
        elif line.startswith("Requirements:"):
            job_data["requirements"] = line.replace("Requirements:", "").split(',')
        elif line.startswith("Responsibilities:"):
            job_data["responsibilities"] = line.replace("Responsibilities:", "").split(',')
        elif line.startswith("Benefits:"):
            job_data["benefits"] = line.replace("Benefits:", "").split(',')

    return job_data

def create_job_from_data(data):
    job_list_instance = JobList(
        title=data["title"],
        description=data["description"],
        location=data["location"],
        contract_type=data["contract_type"],
        maximum_salary=data["maximum_salary"],
        minimum_salary=data["minimum_salary"],
        currency=data["currency"]
    )
    job_list_instance.save()

    # Procesa y asigna herramientas, idiomas, requisitos, responsabilidades y beneficios
    job_list_instance.tools.set(create_related_items(data.get("tools", []), ToolList))
    job_list_instance.languages.set(create_related_items(data.get("languages", []), LanguageList))
    job_list_instance.requirements.set(create_related_items(data.get("requirements", []), RequirementList))
    job_list_instance.responsibilities.set(create_related_items(data.get("responsibilities", []), ResponsibilitiesList))
    job_list_instance.benefits.set(create_related_items(data.get("benefits", []), BenefitsList))

    return job_list_instance

def create_related_items(item_list, model):
    # Implementa la lógica para crear instancias relacionadas
    related_items = []
    for item_name in item_list:
        item, created = model.objects.get_or_create(name=item_name)
        related_items.append(item)
    return related_items
