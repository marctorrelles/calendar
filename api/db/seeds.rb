# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Event.create(title: 'I\'m an event',description: 'This is my description',start:'2018-07-26T12:00:00.000Z',end:'2018-07-26T14:00:00.000Z')
Event.create(title: 'I\'m a second event',description: 'This is my description',start:'2018-08-01T12:00:00.000Z',end:'2018-08-01T13:30:00.000Z')
