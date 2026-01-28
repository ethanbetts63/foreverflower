from django.db import models

class Discount(models.Model):
    """
    Represents a discount code that can be applied to orders.
    """
    code = models.CharField(
        max_length=50,
        unique=True,
        null=False,
        blank=False,
        help_text="The unique discount code."
    )
    florist_name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        help_text="The name of the florist associated with this discount."
    )
    active = models.BooleanField(
        default=True,
        help_text="Indicates if the discount code is currently active."
    )
    date_created = models.DateTimeField(
        auto_now_add=True,
        null=False,
        help_text="The date and time the discount code was created."
    )
    expiry_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="The date and time the discount code expires (optional)."
    )

    def __str__(self):
        return self.code

    class Meta:
        ordering = ['-date_created']
