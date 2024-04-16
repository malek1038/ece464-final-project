
class Event:
    def __init__(self, eventID, name, date, location, description, capacity, organizer):
        self.eventID = eventID
        self.name = name
        self.date = date
        self.location = location
        self.description = description
        self.capacity = capacity
        self.organizer = organizer

    def __str__(self):
        return f"Event ID: {self.eventID}\nName: {self.name}\nDate: {self.date}\nLocation: {self.location}\nDescription: {self.description}\nCapacity: {self.capacity}\nOrganizer: {self.organizer}\n"

    def __repr__(self):
        return f"Event ID: {self.eventID}\nName: {self.name}\nDate: {self.date}\nLocation: {self.location}\nDescription: {self.description}\nCapacity: {self.capacity}\nOrganizer: {self.organizer}\n"

    def getEventID(self):
        return self.eventID

    def getName(self):
        return self.name

    def getDate(self):
        return self.date

    def getLocation(self):
        return self.location

    def getDescription(self):
        return self.description

    def getCapacity(self):
        return self.capacity

    def getOrganizer(self):
        return self.organizer

    def setEventID(self, eventID):
        self.eventID = eventID

    def setName(self, name):
        self.name = name

    def setDate(self, date):
        self.date = date

    def setLocation(self, location):
        self.location = location

    def setDescription(self, description):
        self.description = description

    def setCapacity(self, capacity):
        self.capacity = capacity

    def setOrganizer(self, organizer):
        self.organizer = organizer