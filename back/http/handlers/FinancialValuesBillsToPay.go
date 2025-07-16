package handlers

import (
	"github.com/jserranojunior/scs/backgo/models"
)

/* SUBSTRING(data_pagamento,1,7) = ? AND data_pagamento > '' OR SUBSTRING(data_pagamento,1,7) < ? AND data_pagamento > ''
 */
// DeletePaidBills return Delete paid bills
func GetValuesBillsToPay(id int, date string) models.ValoresContasAPagars {
	var valores models.ValoresContasAPagars
	result := DB.Where("contas_a_pagar_id", id).Where("SUBSTRING(data_pagamento,1,7) = ? AND data_pagamento > ''", date).First(&valores)

	if result.Error != nil {
		DB.Where("contas_a_pagar_id", id).Where("SUBSTRING(data_pagamento,1,7) < ? AND data_pagamento > ''", date).First(&valores)

	}

	return valores
}
