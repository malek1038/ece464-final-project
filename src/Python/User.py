class User:
    def __init__(self, uid, name, password, email, adminBool):
        self.uid = uid
        self.name = name
        self.password = password
        self.email = email
        self.adminBool = adminBool

    def get_uid(self):
        return self.uid
    
    def get_name(self):
        return self.name

    def get_password(self):
        return self.password

    def get_email(self):
        return self.email

    def get_adminBool(self):
        return self.adminBool
    
    def set_uid(self, uid):
        self.uid = uid

    def set_name(self, name):
        self.name = name

    def set_password(self, password):
        self.password = password

    def set_email(self, email):
        self.email = email

    def set_adminBool(self, adminBool):
        self.adminBool = adminBool