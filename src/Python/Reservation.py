class Reservation:
    def __init__(self, reservation_id, user_id, event_id):
        self.reservation_id = reservation_id
        self.user_id = user_id
        self.event_id = event_id

    def __str__(self):
        return f"Reservation ID: {self.reservation_id}\nUser ID: {self.user_id}\nEvent ID: {self.event_id}\n"
    
    def __repr__(self):
        return f"Reservation ID: {self.reservation_id}\nUser ID: {self.user_id}\nEvent ID: {self.event_id}\n"
    
    def get_reservation_id(self):
        return self.reservation_id

    def get_user_id(self):
        return self.user_id

    def get_event_id(self):
        return self.event_id
    
    def set_reservation_id(self, reservation_id):
        self.reservation_id = reservation_id

    def set_user_id(self, user_id):
        self.user_id = user_id

    def set_event_id(self, event_id):
        self.event_id = event_id