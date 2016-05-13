from django import template
import random

register = template.Library()

examplegoals = [
        'Write a book',
        'Learn to program',
        'Run a marathon',
        'Learn French',
        'Start a blog',
        'Learn Sign Language',
        'Clean the house',
        'Visit Japan',
        'Quit smoking'
        ]

@register.simple_tag
def randomgoal():
        return random.choice(examplegoals)
