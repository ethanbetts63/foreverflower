from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    """
    Sitemap for static pages and frontend-routed articles.
    """
    protocol = 'https'

    def items(self):
        return [
            '/',
            '/login',
        ]

    def location(self, item):
        return item

    def changefreq(self, item):
        if item == '/':
            return 'weekly'
        return 'monthly'

    def priority(self, item):
        if item == '/':
            return 1.0
        return 0.7
