import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: asideRef,
	});

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
	};

	const updateFormState = (key: keyof ArticleStateType, value: any) => {
		setFormState({
			...formState,
			[key]: value,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(option) => updateFormState('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => updateFormState('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={(option) => updateFormState('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={(option) => updateFormState('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={(option) => updateFormState('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
